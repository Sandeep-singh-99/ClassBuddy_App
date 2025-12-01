import GeneratedNoteDialog from "@/components/GeneratedNoteDialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { clearGeneratedNotes, generateNotes } from "@/redux/slice/teacherSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function GenerateNote() {
  const dispatch = useAppDispatch();
  const { loading, generatedNotes, error } = useAppSelector(
    (state) => state.teachers
  );

  const [title, setTitle] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a topic title");
      return;
    }

    Keyboard.dismiss();
    await dispatch(generateNotes(title));
  };

  const handleSaved = () => {
    setTitle("");
    dispatch(clearGeneratedNotes());
    setDialogVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#ffffff", "#f8fafc", "#ffffff"]}
        className="flex-1 px-5 pt-10"
      >
        <View className="mb-8">
          <Text className="text-3xl font-bold text-slate-900 mb-2">
            AI Note Generator
          </Text>
          <Text className="text-slate-500">
            Enter a topic and let AI create comprehensive notes for your
            students.
          </Text>
        </View>

        <View className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <Text className="text-slate-700 font-semibold mb-2 ml-1">
            Topic / Title
          </Text>
          <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-6">
            <Ionicons name="bulb-outline" size={20} color="#64748b" />
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g., Introduction to Quantum Physics"
              className="flex-1 ml-3 text-slate-900 text-base"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <TouchableOpacity
            onPress={handleGenerate}
            disabled={loading}
            className={`flex-row items-center justify-center py-4 rounded-xl shadow-sm ${
              loading ? "bg-indigo-400" : "bg-indigo-600"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="white" className="mr-2" />
            ) : (
              <Ionicons
                name="sparkles"
                size={20}
                color="white"
                className="mr-2"
              />
            )}
            <Text className="text-white font-bold text-lg ml-2">
              {loading ? "Generating..." : "Generate Notes"}
            </Text>
          </TouchableOpacity>
        </View>

        {generatedNotes && !loading && (
          <View className="items-center mt-4">
            <View className="bg-green-50 p-4 rounded-full mb-4">
              <Ionicons name="checkmark-circle" size={32} color="#22c55e" />
            </View>
            <Text className="text-slate-900 font-bold text-xl mb-2">
              Notes Generated!
            </Text>
            <Text className="text-slate-500 text-center mb-6 px-8">
              Your content is ready. Review it before saving to your collection.
            </Text>

            <TouchableOpacity
              onPress={() => setDialogVisible(true)}
              className="flex-row items-center bg-white border border-indigo-100 px-6 py-3 rounded-xl shadow-sm"
            >
              <Text className="text-indigo-600 font-semibold mr-2">
                View Generated Content
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#4f46e5" />
            </TouchableOpacity>
          </View>
        )}

        {error && (
          <View className="bg-red-50 p-4 rounded-xl flex-row items-center mt-4">
            <Ionicons name="alert-circle" size={24} color="#ef4444" />
            <Text className="text-red-600 ml-3 flex-1">{error}</Text>
          </View>
        )}

        <GeneratedNoteDialog
          visible={dialogVisible}
          onClose={() => setDialogVisible(false)}
          onSaved={handleSaved}
          title={title}
          content={generatedNotes || ""}
        />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
