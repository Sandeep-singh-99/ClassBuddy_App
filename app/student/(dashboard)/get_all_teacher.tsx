import JoinGroupButton from "@/components/JoinGroupButton";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { viewAllTeacher } from "@/redux/slice/teacherSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function GetAllTeacher() {
  const dispatch = useAppDispatch();

  const { teachers, loading, error } = useAppSelector(
    (state) => state.teachers
  );

  useEffect(() => {
    dispatch(viewAllTeacher());
  }, []);

  if (loading && teachers.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50 p-4">
        <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
        <Text className="text-slate-600 mt-2 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <LinearGradient
        colors={["#4f46e5", "#4338ca"]}
        className="pt-16 pb-8 px-6 rounded-b-3xl shadow-lg"
      >
        <Text className="text-white text-2xl font-bold">Find Teachers</Text>
        <Text className="text-indigo-100 mt-1">
          Join groups to start learning
        </Text>
      </LinearGradient>

      <FlatList
        data={teachers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-slate-100 flex-row items-center">
            <Image
              source={{
                uri:
                  item.image_url ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(item.image_url) +
                    "&background=random",
              }}
              className="w-14 h-14 rounded-full bg-slate-200"
            />
            <View className="flex-1 ml-4">
              <Text className="text-slate-900 font-bold text-lg">
                {item.group_name}
              </Text>
              <Text className="text-slate-500 text-sm">{item.owner.full_name}</Text>
            </View>
            <JoinGroupButton groupId={item.id} />
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-slate-400">No teachers found</Text>
          </View>
        }
      />
    </View>
  );
}
