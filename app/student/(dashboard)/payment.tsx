import StudentGroupCard from "@/components/StudentGroupCard";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchStudentSubscriptionPlans } from "@/redux/slice/subscriptionSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

export default function Payment() {
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { studentGroups, loading } = useAppSelector(
    (state) => state.subscription,
  );
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const loadData = async () => {
    await dispatch(fetchStudentSubscriptionPlans());
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleToggle = (id: string) => {
    setSelectedGroupId((prev) => (prev === id ? null : id));
  };

  return (
    <LinearGradient
      colors={["#ffffff", "#f8fafc", "#ffffff"]}
      className="flex-1"
    >
      <FlatList
        data={studentGroups}
        keyExtractor={(item) => item.group.id}
        renderItem={({ item }) => (
          <StudentGroupCard
            data={item}
            isExpanded={selectedGroupId === item.group.id}
            onToggle={() => handleToggle(item.group.id)}
          />
        )}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
          />
        }
        ListHeaderComponent={
          <View className="mb-6">
            <Text className="text-2xl font-bold text-slate-800">
              My Subscriptions
            </Text>
            <Text className="text-slate-500 mt-1">
              Manage your course subscriptions and plans
            </Text>
          </View>
        }
        ListEmptyComponent={
          !loading ? (
            <View className="items-center justify-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
              <View className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Ionicons name="documents-outline" size={32} color="#94a3b8" />
              </View>
              <Text className="text-slate-500 font-medium text-center">
                You are not part of any groups yet.
              </Text>
              <Text className="text-slate-400 text-xs text-center mt-1 px-10">
                Join a group to see subscription options here.
              </Text>
            </View>
          ) : (
            <View className="py-20">
              <ActivityIndicator size="large" color="#6366f1" />
            </View>
          )
        }
      />
    </LinearGradient>
  );
}
