import { useAppDispatch } from "@/hooks/hooks";
import {
  GetAllInterviewPrep,
  InterviewPrepCreate,
} from "@/redux/slice/interviewSlice";
import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";

interface CreateQuizDialogProps {
  visible: boolean;
  onClose: () => void;
}

export default function CreateQuizDialog({
  visible,
  onClose,
}: CreateQuizDialogProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!topic || !description) {
      Toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await dispatch(
        InterviewPrepCreate({
          name: topic,
          description: description,
        })
      ).unwrap();
      Toast.success("Quiz created successfully");
      setTopic("");
      setDescription("");
      dispatch(GetAllInterviewPrep());
      onClose();
      router.push("/student/quiz_ques");
    } catch (error: any) {
      Toast.error(typeof error === "string" ? error : "Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-slate-900">
              Start New Quiz
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="bg-slate-100 p-2 rounded-full"
            >
              <Ionicons name="close" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-slate-700 font-medium mb-2">Topic</Text>
            <TextInput
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900"
              placeholder="e.g. React Native Basics"
              placeholderTextColor="#94a3b8"
              value={topic}
              onChangeText={setTopic}
            />
          </View>

          <View className="mb-6">
            <Text className="text-slate-700 font-medium mb-2">Description</Text>
            <TextInput
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 h-24"
              placeholder="Describe what you want to be tested on..."
              placeholderTextColor="#94a3b8"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            onPress={handleCreate}
            disabled={loading}
            className="bg-indigo-600 rounded-xl py-4 items-center shadow-lg shadow-indigo-200 mb-4"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Generate Quiz
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
