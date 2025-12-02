import { useAppDispatch } from "@/hooks/hooks";
import { GenerateDashboardData } from "@/redux/slice/dashboardSlice";
import { Ionicons } from "@expo/vector-icons";
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

interface GenerateDashboardDataDialogProps {
  visible: boolean;
  onClose: () => void;
}

export default function GenerateDashboardDataDialog({
  visible,
  onClose,
}: GenerateDashboardDataDialogProps) {
  const dispatch = useAppDispatch();
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!industry) {
      Toast.error("Please enter an industry");
      return;
    }

    try {
      setLoading(true);
      await dispatch(
        GenerateDashboardData({
          industry: industry,
        })
      ).unwrap();
      Toast.success("Insights generated successfully");
      setIndustry("");
      onClose();
    } catch (error: any) {
      Toast.error(
        typeof error === "string" ? error : "Failed to generate insights"
      );
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
              Generate Insights
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="bg-slate-100 p-2 rounded-full"
            >
              <Ionicons name="close" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <Text className="text-slate-700 font-medium mb-2">Industry</Text>
            <TextInput
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900"
              placeholder="e.g. Software Engineering, Data Science"
              placeholderTextColor="#94a3b8"
              value={industry}
              onChangeText={setIndustry}
            />
          </View>

          <TouchableOpacity
            onPress={handleGenerate}
            disabled={loading}
            className="bg-indigo-600 rounded-xl py-4 items-center shadow-lg shadow-indigo-200 mb-4"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Generate Insights
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
