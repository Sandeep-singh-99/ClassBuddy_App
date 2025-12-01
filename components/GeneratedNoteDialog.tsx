import { useAppDispatch } from "@/hooks/hooks";
import { saveNotes } from "@/redux/slice/teacherSlice";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";

interface GeneratedNoteDialogProps {
  visible: boolean;
  onClose: () => void;
  onSaved?: () => void;
  title: string;
  content: string;
}

export default function GeneratedNoteDialog({
  visible,
  onClose,
  onSaved,
  title,
  content,
}: GeneratedNoteDialogProps) {
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      const resultAction = await dispatch(saveNotes(formData));

      if (saveNotes.fulfilled.match(resultAction)) {
        Alert.alert("Success", "Note saved successfully!");
        if (onSaved) onSaved();
        onClose();
      } else {
        Alert.alert("Error", "Failed to save note.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white h-[90%] rounded-t-3xl overflow-hidden">
          {/* Header */}
          <View className="flex-row justify-between items-center p-5 border-b border-slate-100 bg-white z-10">
            <View className="flex-1 mr-4">
              <Text
                className="text-lg font-bold text-slate-900"
                numberOfLines={1}
              >
                {title}
              </Text>
              <Text className="text-xs text-slate-500">Generated Content</Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center rounded-full bg-slate-100"
            >
              <Ionicons name="close" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            className="flex-1 px-5"
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
          >
            <Markdown
              style={{
                body: { color: "#334155", fontSize: 16, lineHeight: 24 },
                heading1: { color: "#1e293b", marginTop: 20, marginBottom: 10 },
                heading2: { color: "#334155", marginTop: 15, marginBottom: 8 },
                code_block: {
                  backgroundColor: "#f1f5f9",
                  borderRadius: 8,
                  padding: 10,
                },
              }}
            >
              {content}
            </Markdown>
          </ScrollView>

          {/* Footer Actions */}
          <View className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 shadow-lg">
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 py-3.5 rounded-xl bg-slate-100 items-center"
              >
                <Text className="text-slate-700 font-semibold">Discard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                disabled={saving}
                className={`flex-1 py-3.5 rounded-xl items-center flex-row justify-center space-x-2 ${
                  saving ? "bg-indigo-400" : "bg-indigo-600"
                }`}
              >
                {saving ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <>
                    <Ionicons name="save-outline" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">
                      Save Note
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
