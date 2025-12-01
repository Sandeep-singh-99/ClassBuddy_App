import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface QuizDetailsDialogProps {
  visible: boolean;
  onClose: () => void;
  quiz: any; // Using any for now to match the flexible response structure
}

export default function QuizDetailsDialog({
  visible,
  onClose,
  quiz,
}: QuizDetailsDialogProps) {
  if (!quiz) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl h-[85%] w-full overflow-hidden">
          {/* Header */}
          <View className="flex-row justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
            <View className="flex-1 mr-4">
              <Text
                className="text-xl font-bold text-slate-900"
                numberOfLines={1}
              >
                {quiz.name}
              </Text>
              <Text className="text-slate-500 text-xs mt-1">
                {formatDate(quiz.created_at)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="bg-slate-200 p-2 rounded-full"
            >
              <Ionicons name="close" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-5">
            {/* Score Card */}
            <View className="bg-indigo-50 p-4 rounded-2xl mb-6 flex-row items-center justify-between border border-indigo-100">
              <View>
                <Text className="text-indigo-900 font-bold text-lg">Score</Text>
                <Text className="text-indigo-600 text-sm">Final Result</Text>
              </View>
              <View className="bg-white px-4 py-2 rounded-xl shadow-sm">
                <Text className="text-2xl font-bold text-indigo-600">
                  {quiz.score}
                </Text>
              </View>
            </View>

            {/* Description */}
            <View className="mb-6">
              <Text className="text-slate-900 font-bold text-base mb-2">
                Description
              </Text>
              <Text className="text-slate-600 leading-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {quiz.description || "No description provided."}
              </Text>
            </View>

            {/* Questions & Answers */}
            <View className="mb-8">
              <Text className="text-slate-900 font-bold text-base mb-4">
                Questions & Answers
              </Text>
              {quiz.questions && Array.isArray(quiz.questions) ? (
                quiz.questions.map((q: any, index: number) => {
                  // Try to find the user's answer
                  // user_answers can be a Dict[str, str] where key is question ID or index?
                  // Assuming user_answers is a map of question_id -> answer
                  // or if it's just a string (as per type Union[Dict, str])

                  let userAnswer = "Not answered";
                  if (
                    typeof quiz.user_answers === "object" &&
                    quiz.user_answers !== null
                  ) {
                    // Try matching by ID if available, otherwise index (less reliable)
                    userAnswer =
                      quiz.user_answers[q.id] ||
                      quiz.user_answers[index] ||
                      "Not answered";
                  } else if (typeof quiz.user_answers === "string") {
                    userAnswer = quiz.user_answers;
                  }

                  return (
                    <View
                      key={index}
                      className="mb-4 border border-slate-200 rounded-xl overflow-hidden"
                    >
                      <View className="bg-slate-50 p-3 border-b border-slate-200">
                        <Text className="text-slate-800 font-semibold">
                          Q{index + 1}:{" "}
                          {q.question || q.text || "Question Text"}
                        </Text>
                      </View>
                      <View className="p-3 bg-white">
                        <Text className="text-slate-500 text-xs mb-1 uppercase font-bold">
                          Your Answer
                        </Text>
                        <Text className="text-slate-700">
                          {typeof userAnswer === "object"
                            ? JSON.stringify(userAnswer)
                            : userAnswer}
                        </Text>

                        {/* Show correct answer if available */}
                        {q.correct_answer && (
                          <View className="mt-2 pt-2 border-t border-slate-100">
                            <Text className="text-green-600 text-xs mb-1 uppercase font-bold">
                              Correct Answer
                            </Text>
                            <Text className="text-slate-700">
                              {q.correct_answer}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text className="text-slate-500 italic">
                  No questions details available.
                </Text>
              )}
            </View>

            <View className="h-10" />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
