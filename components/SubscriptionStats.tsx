import { IStats } from "@/types/subscription";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface SubscriptionStatsProps {
  stats: IStats | null;
}

export default function SubscriptionStats({ stats }: SubscriptionStatsProps) {
  if (!stats) return null;

  return (
    <View className="flex-row justify-between mb-6">
      {/* Earnings Card */}
      <View
        className="bg-white p-5 rounded-2xl border border-slate-100 w-[48%]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View className="bg-green-50 w-10 h-10 rounded-full items-center justify-center mb-3">
          <Ionicons name="cash-outline" size={20} color="#16a34a" />
        </View>
        <Text className="text-slate-500 text-xs font-medium mb-1">
          Total Earnings
        </Text>
        <Text className="text-xl font-bold text-slate-900">
          ₹{stats.total_earnings?.toLocaleString() || 0}
        </Text>
      </View>

      {/* Students Card */}
      <View
        className="bg-white p-5 rounded-2xl border border-slate-100 w-[48%]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View className="bg-indigo-50 w-10 h-10 rounded-full items-center justify-center mb-3">
          <Ionicons name="people-outline" size={20} color="#4f46e5" />
        </View>
        <Text className="text-slate-500 text-xs font-medium mb-1">
          Paid / Total Students
        </Text>
        <Text className="text-xl font-bold text-slate-900">
          {stats.paid_students || 0}{" "}
          <Text className="text-slate-400 text-sm font-normal">
            / {stats.total_students || 0}
          </Text>
        </Text>
      </View>
    </View>
  );
}
