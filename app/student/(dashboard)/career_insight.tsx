import GenerateDashboardDataDialog from "@/components/GenerateDashboardDataDialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { FetchDashboardData } from "@/redux/slice/dashboardSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function CareerInsight() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.dashboard);
  const [refreshing, setRefreshing] = useState(false);

  const [showGenerateDialog, setShowGenerateDialog] = useState(false);

  useEffect(() => {
    dispatch(FetchDashboardData());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(FetchDashboardData());
    setRefreshing(false);
  };

  // Assuming data is an array or object. Based on slice, it might be an array if multiple insights.
  // We'll take the first one if it's an array, or use it directly if it's an object.
  // The slice definition was ambiguous, but let's handle both safely.
  const insight = Array.isArray(data) ? data[0] : data;

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#6366f1" />
        <Text className="text-slate-400 mt-4">Loading insights...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-5">
        <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
        <Text className="text-slate-900 text-lg font-medium mt-4 text-center">
          Failed to load insights
        </Text>
        <Text className="text-slate-500 text-center mt-2 mb-6">{error}</Text>
        <TouchableOpacity
          onPress={() => setShowGenerateDialog(true)}
          className="bg-indigo-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Generate Insights</Text>
        </TouchableOpacity>

        <GenerateDashboardDataDialog
          visible={showGenerateDialog}
          onClose={() => setShowGenerateDialog(false)}
        />
      </View>
    );
  }

  if (!insight) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-5">
        <Ionicons name="analytics-outline" size={48} color="#cbd5e1" />
        <Text className="text-slate-900 text-lg font-medium mt-4">
          No insights available
        </Text>
        <Text className="text-slate-500 text-center mt-2 px-10">
          Generate industry insights to see career data here.
        </Text>
      </View>
    );
  }

  // Prepare chart data
  const salaryLabels =
    insight.salary_range?.map((s: any) => s.role.split(" ")[0]) || [];
  const salaryData =
    insight.salary_range?.map((s: any) => s.median / 1000) || []; // Show in k

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
  };

  const InfoCard = ({ title, value, icon, color, bgColor }: any) => (
    <View className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-3 flex-row items-center">
      <View className={`${bgColor} p-3 rounded-full mr-4`}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-slate-500 text-xs font-medium uppercase">
          {title}
        </Text>
        <Text className="text-slate-900 font-bold text-lg">{value}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#ffffff", "#f8fafc", "#ffffff"]}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
          />
        }
      >
        <View className="mb-6">
          <Text className="text-3xl font-bold text-slate-900">
            Career Insights
          </Text>
          <Text className="text-slate-500">
            Market trends and salary analysis
          </Text>
        </View>

        {/* Key Stats */}
        <View className="mb-6">
          <InfoCard
            title="Market Outlook"
            value={insight.market_outlook}
            icon="trending-up"
            color={
              insight.market_outlook === "Positive"
                ? "#10b981"
                : insight.market_outlook === "Negative"
                  ? "#ef4444"
                  : "#f59e0b"
            }
            bgColor={
              insight.market_outlook === "Positive"
                ? "bg-emerald-50"
                : insight.market_outlook === "Negative"
                  ? "bg-red-50"
                  : "bg-amber-50"
            }
          />
          <InfoCard
            title="Demand Level"
            value={insight.demand_level}
            icon="bar-chart"
            color="#6366f1"
            bgColor="bg-indigo-50"
          />
          <InfoCard
            title="Growth Rate"
            value={`${insight.growth_rate}%`}
            icon="rocket"
            color="#8b5cf6"
            bgColor="bg-violet-50"
          />
        </View>

        {/* Salary Chart */}
        <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <Text className="text-lg font-bold text-slate-900 mb-4">
            Salary Range (Median in k)
          </Text>
          {salaryData.length > 0 ? (
            <BarChart
              data={{
                labels: salaryLabels,
                datasets: [
                  {
                    data: salaryData,
                  },
                ],
              }}
              width={screenWidth - 80}
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              showValuesOnTopOfBars
              fromZero
            />
          ) : (
            <Text className="text-slate-400 text-center py-10">
              No salary data available
            </Text>
          )}
        </View>

        {/* Top Skills */}
        <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <Text className="text-lg font-bold text-slate-900 mb-4">
            Top Skills Required
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {insight.top_skills?.map((skill: string, index: number) => (
              <View key={index} className="bg-slate-100 px-3 py-1.5 rounded-lg">
                <Text className="text-slate-700 font-medium">{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Key Trends */}
        <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <Text className="text-lg font-bold text-slate-900 mb-4">
            Key Market Trends
          </Text>
          {insight.key_trends?.map((trend: string, index: number) => (
            <View key={index} className="flex-row items-start mb-3">
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#6366f1"
                style={{ marginTop: 2, marginRight: 8 }}
              />
              <Text className="text-slate-600 flex-1 leading-5">{trend}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
