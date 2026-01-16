import { IAnalytics } from "@/types/subscription";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

interface SubscriptionAnalyticsProps {
  analytics: IAnalytics | null;
}

const screenWidth = Dimensions.get("window").width;

export default function SubscriptionAnalytics({
  analytics,
}: SubscriptionAnalyticsProps) {
  if (
    !analytics ||
    (!analytics.plan_earnings.length && !analytics.monthly_trends.length)
  ) {
    return null;
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`, // Indigo-600
    strokeWidth: 2,
    barPercentage: 0.7,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`, // Slate-500
  };

  // Prepare data for Bar Chart (Earnings by Plan)
  const planEarningsData = {
    labels: analytics.plan_earnings.map((item) => item.name),
    datasets: [
      {
        data: analytics.plan_earnings.map((item) => item.value),
      },
    ],
  };

  // Prepare data for Line Chart (Monthly Trends)
  // Assuming monthly_trends is an array of objects where keys are plan names or 'name' (date)
  // We need to extract unique plan names (excluding 'name') to form datasets
  const trendLabels = analytics.monthly_trends.map((item) => {
    // Format date simple logic (assuming YYYY-MM-DD or similar) -> DD/MM
    const dateStr = item.name;
    return dateStr.split("-").slice(1).join("/");
  });

  // Extract all Plan Names from keys, excluding 'name'
  const allKeys = new Set<string>();
  analytics.monthly_trends.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== "name") allKeys.add(key);
    });
  });
  const planNames = Array.from(allKeys);

  const trendDatasets = planNames.map((planName, index) => {
    const colors = [
      (opacity = 1) => `rgba(99, 102, 241, ${opacity})`, // Indigo
      (opacity = 1) => `rgba(16, 185, 129, ${opacity})`, // Emerald
      (opacity = 1) => `rgba(245, 158, 11, ${opacity})`, // Amber
      (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, // Red
    ];
    return {
      data: analytics.monthly_trends.map(
        (item) => (item[planName] as number) || 0
      ),
      color: colors[index % colors.length],
      strokeWidth: 2,
      legend: planName, // Add legend for multi-line
    };
  });

  const lineChartData = {
    labels: trendLabels,
    datasets: trendDatasets,
    legend: planNames,
  };

  return (
    <View className="mb-6 gap-6">
      {/* Earnings by Plan (Bar Chart) */}
      {analytics.plan_earnings.length > 0 && (
        <View
          className="bg-white p-4 rounded-2xl border border-slate-100"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Text className="text-lg font-bold text-slate-800 mb-4">
            Earnings by Plan
          </Text>
          <BarChart
            data={planEarningsData}
            width={screenWidth - 75} // Adjust for padding
            height={220}
            yAxisLabel="₹"
            yAxisSuffix=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            showValuesOnTopOfBars
            fromZero
          />
        </View>
      )}

      {/* Monthly Trends (Line Chart) */}
      {analytics.monthly_trends.length > 0 && (
        <View
          className="bg-white p-4 rounded-2xl border border-slate-100"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Text className="text-lg font-bold text-slate-800 mb-4">
            Monthly Revenue Trends
          </Text>
          <LineChart
            data={lineChartData}
            width={screenWidth - 80}
            height={220}
            chartConfig={{
              ...chartConfig,
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#ffffff",
              },
            }}
            bezier
            yAxisLabel="₹"
            yAxisSuffix=""
          />
        </View>
      )}
    </View>
  );
}
