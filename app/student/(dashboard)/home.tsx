import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const quickActions = [
    {
      title: "My Notes",
      icon: "book-outline",
      color: "#3b82f6",
      bgColor: "bg-blue-50",
      route: "/student/note",
      description: "Manage your study notes",
    },
    {
      title: "Quizzes",
      icon: "help-circle-outline",
      color: "#8b5cf6",
      bgColor: "bg-violet-50",
      route: "/student/quiz",
      description: "Test your knowledge",
    },
    {
      title: "Assignments",
      icon: "clipboard-outline",
      color: "#10b981",
      bgColor: "bg-emerald-50",
      route: "/student/assignment",
      description: "View pending tasks",
    },
    {
      title: "Career Insights",
      icon: "stats-chart-outline",
      color: "#f59e0b",
      bgColor: "bg-amber-50",
      route: "/student/career_insight",
      description: "Analyze market trends",
    },
    {
      title: "Teachers",
      icon: "people-outline",
      color: "#ec4899",
      bgColor: "bg-pink-50",
      route: "/student/get_all_teacher",
      description: "Connect with mentors",
    },
    {
      title: "Documents",
      icon: "document-text-outline",
      color: "#6366f1",
      bgColor: "bg-indigo-50",
      route: "/student/doc",
      description: "Access study materials",
    },
  ];

  return (
    <LinearGradient
      colors={["#ffffff", "#f8fafc", "#f1f5f9"]}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
        {/* Header Section */}
        <View className="mb-8">
          <Text className="text-slate-500 text-lg font-medium mb-1">
            Welcome back,
          </Text>
          <Text className="text-3xl font-bold text-slate-900">
            {user?.full_name || "Student"}
          </Text>
          <Text className="text-slate-400 mt-2">
            What would you like to learn today?
          </Text>
        </View>

        {/* Quick Actions Grid */}
        <View className="flex-row flex-wrap justify-between">
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(action.route as any)}
              className="bg-white w-[48%] p-4 rounded-2xl mb-4 shadow-sm border border-slate-100"
            >
              <View
                className={`${action.bgColor} w-12 h-12 rounded-full items-center justify-center mb-3`}
              >
                <Ionicons
                  name={action.icon as any}
                  size={24}
                  color={action.color}
                />
              </View>
              <Text className="text-slate-900 font-bold text-base mb-1">
                {action.title}
              </Text>
              <Text className="text-slate-500 text-xs leading-4">
                {action.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity Placeholder (Optional Future Enhancement) */}
        <View className="mt-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-slate-900">
              Daily Quote
            </Text>
            <Ionicons name="sparkles-outline" size={20} color="#eab308" />
          </View>
          <Text className="text-slate-600 italic leading-6">
            "The beautiful thing about learning is that no one can take it away
            from you."
          </Text>
          <Text className="text-slate-400 text-right mt-2 text-sm">
            - B.B. King
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
