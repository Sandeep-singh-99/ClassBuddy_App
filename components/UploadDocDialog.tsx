import { useAppDispatch } from "@/hooks/hooks";
import { DocsUpload } from "@/redux/slice/docSlice";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface UploadDocDialogProps {
  visible: boolean;
  onClose: () => void;
}

export default function UploadDocDialog({
  visible,
  onClose,
}: UploadDocDialogProps) {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [filename, setFilename] = useState("");
  const [uploading, setUploading] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      setSelectedFile(file);
      setFilename(file.name);
    } catch (err) {
      console.log("Unknown Error: ", err);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert("Error", "Please select a file first.");
      return;
    }

    setUploading(true);
    try {
      const resultAction = await dispatch(
        DocsUpload({
          filename: filename || selectedFile.name,
          file: selectedFile,
        })
      );

      if (DocsUpload.fulfilled.match(resultAction)) {
        onClose();
        setSelectedFile(null);
        setFilename("");
        Alert.alert("Success", "Document uploaded successfully!");
      } else {
        Alert.alert("Error", "Failed to upload document.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedFile(null);
    setFilename("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-[90%] bg-white p-6 rounded-2xl shadow-lg">
          <Text className="text-xl font-bold text-slate-900 mb-4">
            Upload Document
          </Text>

          <TouchableOpacity
            onPress={pickDocument}
            className="flex-row items-center justify-center bg-slate-50 border border-dashed border-slate-300 p-4 rounded-xl mb-4"
          >
            {selectedFile ? (
              <View className="items-center">
                <Ionicons
                  name="document-text-outline"
                  size={32}
                  color="#2563eb"
                />
                <Text className="text-slate-700 font-medium mt-2 text-center">
                  {selectedFile.name}
                </Text>
                <Text className="text-slate-400 text-xs mt-1">
                  {(selectedFile.size! / 1024 / 1024).toFixed(2)} MB
                </Text>
              </View>
            ) : (
              <View className="items-center">
                <Ionicons
                  name="cloud-upload-outline"
                  size={32}
                  color="#94a3b8"
                />
                <Text className="text-slate-500 font-medium mt-2">
                  Select a file to upload
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <Text className="text-slate-700 font-medium mb-2">Filename</Text>
          <TextInput
            value={filename}
            onChangeText={setFilename}
            placeholder="Enter filename"
            className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 mb-6"
          />

          <View className="flex-row justify-end space-x-3 gap-2">
            <TouchableOpacity
              onPress={handleClose}
              className="px-4 py-2 rounded-lg bg-slate-100"
            >
              <Text className="text-slate-600 font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpload}
              disabled={uploading || !selectedFile}
              className={`px-4 py-2 rounded-lg ${
                uploading || !selectedFile ? "bg-blue-300" : "bg-blue-600"
              }`}
            >
              {uploading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white font-medium">Upload</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
