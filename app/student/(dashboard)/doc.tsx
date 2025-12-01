import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { DocsStudentFetch } from "@/redux/slice/docSlice";
import { IDocs } from "@/types/doc";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Doc() {
  const { docs, loading, error } = useAppSelector((state) => state.docs);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(DocsStudentFetch());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(DocsStudentFetch());
    setRefreshing(false);
  };

  const handleOpenDoc = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open this URL: " + url);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const renderItem = ({ item }: { item: IDocs }) => (
    <View className="mb-4 overflow-hidden rounded-2xl shadow-sm bg-white border border-slate-100">
      <View className="p-5">
        <View className="flex-row justify-between items-start mb-3">
          <View className="bg-indigo-50 p-2 rounded-lg">
            <Ionicons
              name="document-attach-outline"
              size={24}
              color="#6366f1"
            />
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
          className="text-lg font-bold text-slate-900 mb-1"
          numberOfLines={1}
        >
          {item.filename}
        </Text>

        <View className="flex-row items-center mb-4">
          <Text className="text-slate-500 text-xs mr-1">Posted by:</Text>
          <Text className="text-slate-700 text-xs font-medium">
            {item.owner?.full_name || "Teacher"}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleOpenDoc(item.file_url)}
          className="flex-row items-center justify-center bg-indigo-50 py-2.5 rounded-xl border border-indigo-100"
        >
          <Text className="text-indigo-600 text-sm font-semibold mr-2">
            View Document
          </Text>
          <Ionicons name="cloud-download-outline" size={18} color="#4f46e5" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#ffffff", "#f8fafc", "#ffffff"]}
      className="flex-1"
    >
      <View className="pt-12 px-5 pb-4">
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text className="text-slate-900 text-3xl font-bold">Documents</Text>
            <Text className="text-slate-500 text-sm">
              Resources shared by your teachers
            </Text>
          </View>
        </View>
      </View>

      {loading && !refreshing ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#6366f1" />
          <Text className="text-slate-400 mt-4">Loading documents...</Text>
        </View>
      ) : (
        <FlatList<IDocs>
          data={docs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6366f1"
              colors={["#6366f1"]}
            />
          }
          ListEmptyComponent={
            <View className="items-center justify-center mt-20 opacity-50">
              <Ionicons name="folder-open-outline" size={80} color="#cbd5e1" />
              <Text className="text-slate-900 text-lg font-medium mt-4">
                No documents found
              </Text>
              <Text className="text-slate-500 text-center mt-2 px-10">
                Your teachers haven't uploaded any documents yet
              </Text>
            </View>
          }
        />
      )}
    </LinearGradient>
  );
}
