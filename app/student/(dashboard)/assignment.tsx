import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

export default function Assignment() {
  return (
    <LinearGradient
      colors={["#ffffff", "#f8fafc", "#f1f5f9"]}
      className="flex-1 justify-center items-center p-6"
    >
      <View className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 items-center w-full max-w-sm">
        <View className="bg-indigo-50 p-6 rounded-full mb-6">
          <Ionicons name="rocket-outline" size={48} color="#6366f1" />
        </View>
        <Text className="text-2xl font-bold text-slate-900 mb-2 text-center">
          Coming Soon!
        </Text>
        <Text className="text-slate-500 text-center leading-6">
          We are working hard to bring you the Assignments feature. Stay tuned
          for updates!
        </Text>
      </View>
    </LinearGradient>
  );
}
