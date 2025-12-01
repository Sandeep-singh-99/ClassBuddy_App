import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface QuizResultDialogProps {
  visible: boolean;
  score: number;
  totalQuestions: number;
  onClose: () => void;
}

export default function QuizResultDialog({
  visible,
  score,
  totalQuestions,
  onClose,
}: QuizResultDialogProps) {
  const router = useRouter();

  const handleGoHome = () => {
    onClose();
    router.navigate("/student/(dashboard)/quiz");
  };

  const percentage = Math.round((score / totalQuestions) * 100) || 0;
  let message = "Keep practicing!";
  let icon = "star-outline";
  let color = "#64748b";

  if (percentage >= 80) {
    message = "Excellent Job!";
    icon = "trophy";
    color = "#fbbf24"; // Amber-400
  } else if (percentage >= 50) {
    message = "Good Effort!";
    icon = "thumbs-up";
    color = "#4f46e5"; // Indigo-600
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleGoHome}
    >
      <View className="flex-1 justify-center items-center bg-black/60 px-6">
        <View className="bg-white rounded-3xl p-8 w-full items-center shadow-2xl">
          <View className="bg-slate-50 p-6 rounded-full mb-4 border-4 border-white shadow-sm">
            <Ionicons name={icon as any} size={64} color={color} />
          </View>

          <Text className="text-2xl font-bold text-slate-900 mb-2">
            {message}
          </Text>
          <Text className="text-slate-500 text-center mb-6">
            You scored {score} out of {totalQuestions} questions
          </Text>

          <View className="flex-row items-end mb-8">
            <Text className="text-6xl font-bold text-indigo-600">
              {percentage}
            </Text>
            <Text className="text-xl font-bold text-indigo-400 mb-2">%</Text>
          </View>

          <TouchableOpacity
            onPress={handleGoHome}
            className="bg-indigo-600 w-full py-4 rounded-xl items-center shadow-lg shadow-indigo-200"
          >
            <Text className="text-white font-bold text-lg">
              Back to Quizzes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
