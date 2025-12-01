import StudentList from "@/components/StudentList";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { teacherNotes } from "@/redux/slice/noteSlice";
import { totalSubmission } from "@/redux/slice/submissionSlice";
import { GroupJoinStudents } from "@/redux/slice/teacherSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

export default function Home() {
  const dispatch = useAppDispatch();
  const { teachers } = useAppSelector((state) => state.teachers);
  const { count } = useAppSelector((state) => state.notes);
  const { totalSubmissions } = useAppSelector((state) => state.submissions);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    await Promise.all([
      dispatch(GroupJoinStudents()),
      dispatch(teacherNotes()),
      dispatch(totalSubmission()),
    ]);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, icon, color, bgColor }: any) => (
    <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 w-[48%] mb-4">
      <View
        className={`${bgColor} w-10 h-10 rounded-full items-center justify-center mb-3`}
      >
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text className="text-slate-500 text-xs font-medium mb-1">{title}</Text>
      <Text className="text-2xl font-bold text-slate-900">{value ?? 0}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#ffffff", "#f8fafc", "#ffffff"]}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 60 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
          />
        }
      >
        <View className="mb-8">
          <Text className="text-3xl font-bold text-slate-900">Dashboard</Text>
          <Text className="text-slate-500">
            Overview of your classroom activity
          </Text>
        </View>

        <View className="flex-row flex-wrap justify-between mb-6">
          <StatCard
            title="Total Students"
            value={teachers?.[0]?.students_count || 0}
            icon="people"
            color="#6366f1"
            bgColor="bg-indigo-50"
          />
          <StatCard
            title="Total Notes"
            value={count || 0}
            icon="document-text"
            color="#10b981"
            bgColor="bg-emerald-50"
          />
          <StatCard
            title="Total Assignments"
            value={totalSubmissions || 0}
            icon="file-tray-full"
            color="#f59e0b"
            bgColor="bg-amber-50"
          />
          <View className="w-[48%]" />
        </View>

        <StudentList students={teachers?.[0]?.members || []} />
      </ScrollView>
    </LinearGradient>
  );
}
