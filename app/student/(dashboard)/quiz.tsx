import CreateQuizDialog from "@/components/CreateQuizDialog";
import PerformanceChat from "@/components/PerformanceChat";
import QuizDetailsDialog from "@/components/QuizDetailsDialog";
import RecentQuizItem from "@/components/RecentQuizItem";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { GetAllInterviewPrep } from "@/redux/slice/interviewSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Quiz() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.interviews);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [createDialogVisible, setCreateDialogVisible] = useState(false);

  useEffect(() => {
    dispatch(GetAllInterviewPrep());
  }, [dispatch]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(GetAllInterviewPrep());
    setRefreshing(false);
  }, [dispatch]);

  const handleQuizPress = (quiz: any) => {
    setSelectedQuiz(quiz);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedQuiz(null);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <LinearGradient
        colors={["#4f46e5", "#4338ca"]}
        className="pt-16 pb-8 px-6 rounded-b-3xl shadow-lg mb-6"
      >
        <Text className="text-white text-2xl font-bold">Quiz Performance</Text>
        <Text className="text-indigo-100 mt-1">
          Track your interview preparation
        </Text>
      </LinearGradient>

      <FlatList
        data={Array.isArray(data) ? data : []}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <RecentQuizItem item={item} onPress={handleQuizPress} />
        )}
        ListHeaderComponent={
          <View className="mb-6">
            <PerformanceChat />
            <Text className="text-lg font-bold text-slate-900 mt-6 mb-2 ml-1">
              Recent Quizzes
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !loading ? (
            <View className="items-center justify-center py-10">
              <Ionicons
                name="document-text-outline"
                size={48}
                color="#cbd5e1"
              />
              <Text className="text-slate-400 mt-2">No quizzes taken yet</Text>
            </View>
          ) : null
        }
      />

      {loading && !refreshing && (
        <View className="absolute inset-0 justify-center items-center bg-white/50">
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => setCreateDialogVisible(true)}
        className="absolute bottom-6 right-6 bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-lg shadow-indigo-300"
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <QuizDetailsDialog
        visible={dialogVisible}
        onClose={closeDialog}
        quiz={selectedQuiz}
      />

      <CreateQuizDialog
        visible={createDialogVisible}
        onClose={() => setCreateDialogVisible(false)}
      />
    </View>
  );
}
