import { useAppSelector } from "@/hooks/hooks";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function PerformanceChat() {
  const { data } = useAppSelector((state) => state.interviews);

  // Ensure data is an array and has items
  const chartData =
    Array.isArray(data) && data.length > 0
      ? {
          labels: data.map((item: any) => item.name.substring(0, 10)), // Truncate long names
          datasets: [
            {
              data: data.map((item: any) => item.score || 0),
            },
          ],
        }
      : null;

  if (!chartData) {
    return (
      <View className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 items-center justify-center h-64">
        <Text className="text-slate-400 font-medium">
          No performance data available
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <LinearGradient
        colors={["#ffffff", "#f8fafc"]}
        className="p-4 border-b border-slate-50"
      >
        <Text className="text-lg font-bold text-slate-800">
          Performance Overview
        </Text>
        <Text className="text-slate-500 text-xs">Your recent quiz scores</Text>
      </LinearGradient>

      <View className="items-center py-4">
        <BarChart
          data={chartData}
          width={screenWidth - 48} // Adjust for padding
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`, // Indigo-600
            labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`, // Slate-500
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.7,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          showValuesOnTopOfBars
        />
      </View>
    </View>
  );
}
