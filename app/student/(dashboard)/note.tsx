import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { studentJoinGroupNote } from "@/redux/slice/noteSlice";
import { NoteState } from "@/types/note";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Note() {
  const { notes, loading, error } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(studentJoinGroupNote());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(studentJoinGroupNote());
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: NoteState }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.push({ pathname: "/student/[id]", params: { id: item.id } })
      }
      className="mb-4 overflow-hidden rounded-2xl shadow-sm bg-white border border-slate-100"
    >
      <View className="p-5">
        <View className="flex-row justify-between items-start mb-3">
          <View className="bg-blue-50 p-2 rounded-lg">
            <Ionicons name="document-text-outline" size={24} color="#3b82f6" />
          </View>
          <View className="flex-row items-center space-x-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
            <Ionicons name="calendar-outline" size={12} color="#64748b" />
            <Text className="text-slate-500 text-xs">
              {item.created_at
                ? new Date(item.created_at).toLocaleDateString()
                : "N/A"}
            </Text>
          </View>
        </View>

        <Text
          className="text-xl font-bold text-slate-900 mb-2"
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <View className="mt-4 flex-row items-center justify-end">
          <Text className="text-blue-500 text-sm font-medium mr-1">
            Read More
          </Text>
          <Ionicons name="arrow-forward" size={16} color="#3b82f6" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#ffffff", "#f8fafc", "#ffffff"]}
      className="flex-1"
    >
      <View className="pt-12 px-5 pb-4">
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text className="text-slate-900 text-3xl font-bold">Notes</Text>
            <Text className="text-slate-500 text-sm">
              Access your study materials
            </Text>
          </View>
        </View>
      </View>

      {loading && !refreshing ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-slate-400 mt-4">Loading notes...</Text>
        </View>
      ) : (
        <FlatList<NoteState>
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#3b82f6"
              colors={["#3b82f6"]}
            />
          }
          ListEmptyComponent={
            <View className="items-center justify-center mt-20 opacity-50">
              <Ionicons name="document-outline" size={80} color="#cbd5e1" />
              <Text className="text-slate-900 text-lg font-medium mt-4">
                No notes found
              </Text>
              <Text className="text-slate-500 text-center mt-2 px-10">
                Your teacher hasn't posted any notes yet
              </Text>
            </View>
          }
        />
      )}
    </LinearGradient>
  );
}
