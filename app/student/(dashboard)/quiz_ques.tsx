import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { submitQuiz } from "@/redux/slice/interviewSlice";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

export default function QuizQues() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentQuiz } = useAppSelector((state) => state.interviews);
  const data = currentQuiz;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<{
    score: number;
    total: number;
    percentage: number;
  } | null>(null);

  // Fallback if no data
  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 justify-center items-center p-6">
        <Text className="text-slate-500 text-lg text-center mb-4">
          No quiz data available. Please generate a quiz first.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-indigo-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const questions = data.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = (option: string) => {
    const questionKey = currentQuestion.id || currentQuestionIndex.toString();
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < totalQuestions) {
      Toast.warn("Please answer all questions before submitting.");
      return;
    }

    // Calculate score locally
    let calculatedScore = 0;
    questions.forEach((q: any, index: number) => {
      const questionKey = q.id || index.toString();
      const userAnswer = answers[questionKey];
      // Check if answer is correct (using startsWith logic from React code)
      // Assuming q.answer or q.correct_answer holds the correct value
      const correctAnswer = q.answer || q.correct_answer;
      if (userAnswer && correctAnswer && userAnswer.startsWith(correctAnswer)) {
        calculatedScore += 1;
      }
    });

    try {
      setLoading(true);
      const result = await dispatch(
        submitQuiz({
          name: data.name,
          description: data.description,
          questions: data.questions,
          score: calculatedScore,
          user_answers: answers,
        })
      ).unwrap();

      // Update local state with calculated score
      setScore({
        score: calculatedScore,
        total: totalQuestions,
        percentage: Math.round((calculatedScore / totalQuestions) * 100),
      });
      setShowResult(true);
    } catch (error: any) {
      Toast.error(typeof error === "string" ? error : "Failed to submit quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-200 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-slate-100 p-2 rounded-full"
        >
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-slate-900">
          Quiz: {data.name || "Topic"}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress Bar */}
      <View className="h-1 bg-slate-200 w-full">
        <View
          className="h-full bg-indigo-600"
          style={{ width: `${progress}%` }}
        />
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Question Counter */}
        <Text className="text-indigo-600 font-bold mb-2">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </Text>

        {/* Question Text */}
        <Text className="text-xl font-bold text-slate-900 mb-8 leading-8">
          {currentQuestion.question}
        </Text>

        {/* Options */}
        <View className="space-y-4">
          {currentQuestion.options.map((option: string, index: number) => {
            const questionKey =
              currentQuestion.id || currentQuestionIndex.toString();
            const isSelected = answers[questionKey] === option;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionSelect(option)}
                className={`p-4 rounded-xl border-2 flex-row items-center ${
                  isSelected
                    ? "bg-indigo-50 border-indigo-600"
                    : "bg-white border-slate-200"
                }`}
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 mr-4 justify-center items-center ${
                    isSelected ? "border-indigo-600" : "border-slate-300"
                  }`}
                >
                  {isSelected && (
                    <View className="w-3 h-3 rounded-full bg-indigo-600" />
                  )}
                </View>
                <Text
                  className={`text-base font-medium flex-1 ${
                    isSelected ? "text-indigo-900" : "text-slate-700"
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View className="p-6 bg-white border-t border-slate-200">
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-4 rounded-xl border border-slate-200 ${
              currentQuestionIndex === 0 ? "opacity-50" : "bg-white"
            }`}
          >
            <Text className="font-bold text-slate-700">Previous</Text>
          </TouchableOpacity>

          {currentQuestionIndex === totalQuestions - 1 ? (
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              className="bg-indigo-600 px-8 py-4 rounded-xl flex-1 ml-4 items-center shadow-lg shadow-indigo-200"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  Submit Quiz
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleNext}
              className="bg-indigo-600 px-8 py-4 rounded-xl flex-1 ml-4 items-center shadow-lg shadow-indigo-200"
            >
              <Text className="text-white font-bold text-lg">Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Result Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showResult}
        onRequestClose={() => {}}
      >
        <View className="flex-1 bg-black/60 justify-center items-center p-6">
          <View className="bg-white rounded-3xl p-8 w-full max-w-sm items-center">
            <View className="bg-indigo-100 p-4 rounded-full mb-6">
              <Ionicons name="trophy" size={40} color="#4f46e5" />
            </View>
            <Text className="text-2xl font-bold text-slate-900 mb-2">
              Quiz Completed!
            </Text>
            <Text className="text-slate-500 text-center mb-8">
              You have successfully completed the quiz. Here is your result:
            </Text>

            <View className="flex-row justify-between w-full mb-8 bg-slate-50 p-6 rounded-2xl">
              <View className="items-center flex-1 border-r border-slate-200">
                <Text className="text-3xl font-bold text-indigo-600">
                  {score?.score}/{score?.total}
                </Text>
                <Text className="text-slate-500 text-sm">Score</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-3xl font-bold text-emerald-600">
                  {score?.percentage}%
                </Text>
                <Text className="text-slate-500 text-sm">Accuracy</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                setShowResult(false);
                router.replace("/student/quiz");
              }}
              className="bg-indigo-600 w-full py-4 rounded-xl items-center shadow-lg shadow-indigo-200"
            >
              <Text className="text-white font-bold text-lg">Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
