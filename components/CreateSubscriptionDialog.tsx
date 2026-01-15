import { useAppDispatch } from "@/hooks/hooks";
import {
  createSubscriptionPlan,
  updateSubscriptionPlan,
} from "@/redux/slice/subscriptionSlice";
import { ISubscriptionPlan } from "@/types/subscription";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface CreateSubscriptionDialogProps {
  visible: boolean;
  onClose: () => void;
  plan?: ISubscriptionPlan | null; // If provided, we are in edit mode
}

export default function CreateSubscriptionDialog({
  visible,
  onClose,
  plan,
}: CreateSubscriptionDialogProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    plan_name: "",
    amount: "",
    validity_days: "",
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        plan_name: plan.plan_name,
        amount: String(plan.amount),
        validity_days: String(plan.validity_days),
      });
    } else {
      setFormData({
        plan_name: "",
        amount: "",
        validity_days: "",
      });
    }
  }, [plan, visible]);

  const handleSubmit = async () => {
    if (!formData.plan_name || !formData.amount || !formData.validity_days) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.BOTTOM);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        plan_name: formData.plan_name,
        amount: Number(formData.amount),
        validity_days: Number(formData.validity_days),
      };

      if (plan) {
        await dispatch(
          updateSubscriptionPlan({ id: plan.id, data: payload })
        ).unwrap();
        ToastAndroid.show("Plan updated successfully", ToastAndroid.BOTTOM);
      } else {
        await dispatch(createSubscriptionPlan(payload)).unwrap();
        ToastAndroid.show("Plan created successfully", ToastAndroid.BOTTOM);
      }
      onClose();
    } catch (error: any) {
      ToastAndroid.show(
        typeof error === "string" ? error : "Something went wrong",
        ToastAndroid.BOTTOM
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full max-w-sm">
              <View className="bg-white rounded-[32px] p-8 shadow-2xl">
                {/* Header */}
                <View className="flex-row justify-between items-center mb-8">
                  <Text className="text-2xl font-bold text-slate-800 tracking-tight">
                    {plan ? "Edit Plan" : "Create Plan"}
                  </Text>
                  <TouchableOpacity
                    onPress={onClose}
                    className="bg-slate-100 p-2.5 rounded-full active:bg-slate-200"
                  >
                    <Ionicons name="close" size={24} color="#64748b" />
                  </TouchableOpacity>
                </View>

                {/* Form */}
                <View className="space-y-6">
                  <View>
                    <Text className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
                      Plan Name
                    </Text>
                    <TextInput
                      value={formData.plan_name}
                      onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, plan_name: text }))
                      }
                      placeholder="e.g. Monthly Premium"
                      placeholderTextColor="#94a3b8"
                      className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 text-base font-medium"
                    />
                  </View>

                  <View className="flex-row space-x-4 pt-2">
                    <View className="flex-1">
                      <Text className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
                        Amount (₹)
                      </Text>
                      <TextInput
                        value={formData.amount}
                        onChangeText={(text) =>
                          setFormData((prev) => ({ ...prev, amount: text }))
                        }
                        placeholder="499"
                        placeholderTextColor="#94a3b8"
                        keyboardType="numeric"
                        className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 text-base font-medium"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
                        Validity
                      </Text>
                      <TextInput
                        value={formData.validity_days}
                        onChangeText={(text) =>
                          setFormData((prev) => ({
                            ...prev,
                            validity_days: text,
                          }))
                        }
                        placeholder="30 Days"
                        placeholderTextColor="#94a3b8"
                        keyboardType="numeric"
                        className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 text-base font-medium"
                      />
                    </View>
                  </View>
                </View>

                {/* Footer */}
                <View className="mt-10">
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={loading}
                    className="bg-indigo-600 py-4 rounded-2xl items-center shadow-lg shadow-indigo-200 active:bg-indigo-700 active:scale-[0.98] transform transition-all"
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text className="text-white font-bold text-lg tracking-wide">
                        {plan ? "Update Plan" : "Create Plan"}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
