import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface RecentQuizItemProps {
  item: any;
  onPress: (item: any) => void;
}

export default function RecentQuizItem({ item, onPress }: RecentQuizItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(item)}
      className="bg-white p-4 rounded-2xl mb-3 shadow-sm border border-slate-100 flex-row items-center justify-between"
    >
      <View className="flex-1 mr-3">
        <Text
          className="text-slate-900 font-bold text-base mb-1"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="text-slate-500 text-xs" numberOfLines={2}>
          {item.description}
        </Text>
        <View className="flex-row items-center mt-2">
          <Ionicons name="calendar-outline" size={12} color="#94a3b8" />
          <Text className="text-slate-400 text-[10px] ml-1">
            {item.created_at
              ? new Date(item.created_at).toLocaleDateString()
              : "N/A"}
          </Text>
        </View>
      </View>

      <View className="items-end">
        <View className="bg-indigo-50 px-3 py-1 rounded-full mb-1">
          <Text className="text-indigo-600 font-bold text-sm">
            {item.score || 0}
          </Text>
        </View>
        <Text className="text-slate-400 text-[10px]">Score</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={16}
        color="#cbd5e1"
        style={{ marginLeft: 8 }}
      />
    </TouchableOpacity>
  );
}
