import { IStudentGroupSubscription } from "@/types/subscription";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface StudentGroupCardProps {
  data: IStudentGroupSubscription;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function StudentGroupCard({
  data,
  isExpanded,
  onToggle,
}: StudentGroupCardProps) {
  const { teacher, group, plans, subscription } = data;
  const isSubscribed = subscription && subscription.is_active;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getActivePlanName = () => {
    if (!subscription) return "Unknown Plan";
    const plan = plans.find((p) => p.id === subscription.plan_id);
    return plan ? plan.plan_name : "Active Subscription";
  };

  return (
    <View className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-4 overflow-hidden">
      {/* Header Section */}
      <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
        <LinearGradient
          colors={
            isSubscribed ? ["#ecfdf5", "#d1fae5"] : ["#f8fafc", "#f1f5f9"]
          }
          className="p-4 border-b border-slate-100"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="relative">
                <Image
                  source={{
                    uri:
                      group.image_url ||
                      "https://ui-avatars.com/api/?name=" + group.name,
                  }}
                  className="w-12 h-12 rounded-xl bg-slate-200"
                />
                <Image
                  source={{
                    uri:
                      teacher.image_url ||
                      "https://ui-avatars.com/api/?name=" + teacher.name,
                  }}
                  className="w-6 h-6 rounded-full absolute -bottom-1 -right-1 border-2 border-white"
                />
              </View>
              <View className="ml-3 flex-1">
                <Text
                  className="text-base font-bold text-slate-800"
                  numberOfLines={1}
                >
                  {group.name}
                </Text>
                <Text className="text-xs text-slate-500">{teacher.name}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View
                className={`px-3 py-1 rounded-full ${
                  isSubscribed ? "bg-green-100" : "bg-slate-200"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    isSubscribed ? "text-green-700" : "text-slate-600"
                  }`}
                >
                  {isSubscribed ? "Active" : "No Plan"}
                </Text>
              </View>
              <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color="#64748b"
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Content Section */}
      {isExpanded && (
        <View className="p-4">
          {isSubscribed ? (
            // Active Subscription View
            <View>
              <View className="flex-row items-center mb-2">
                <Ionicons name="shield-checkmark" size={20} color="#059669" />
                <Text className="text-lg font-bold text-slate-800 ml-2">
                  {getActivePlanName()}
                </Text>
              </View>
              <Text className="text-slate-500 text-sm mb-4">
                Your subscription is active until{" "}
                {formatDate(subscription.valid_till)}.
              </Text>
              <View className="bg-slate-50 p-3 rounded-xl flex-row items-center justify-between">
                <Text className="text-slate-600 text-sm font-medium">
                  Amount Paid
                </Text>
                <Text className="text-slate-900 text-base font-bold">
                  ₹{subscription.amount}
                </Text>
              </View>
            </View>
          ) : (
            // Available Plans List - Vertical Stack
            <View>
              <Text className="text-sm font-bold text-slate-700 mb-3">
                Available Plans
              </Text>
              {plans.length > 0 ? (
                <View className="gap-4">
                  {plans.map((plan) => (
                    <View
                      key={plan.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 w-full relative"
                    >
                      <View className="absolute top-0 left-0 bottom-0 w-1 bg-indigo-500 rounded-l-xl opacity-80" />
                      <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-lg font-bold text-slate-800">
                          {plan.plan_name}
                        </Text>
                        <Text className="text-xl font-extrabold text-indigo-600">
                          ₹{plan.amount}
                        </Text>
                      </View>

                      <View className="flex-row items-center mb-4">
                        <Ionicons
                          name="time-outline"
                          size={14}
                          color="#64748b"
                        />
                        <Text className="text-sm text-slate-500 ml-1">
                          {plan.validity_days} Days Validity
                        </Text>
                      </View>

                      <TouchableOpacity className="bg-indigo-600 py-3 rounded-xl items-center active:bg-indigo-700 shadow-sm shadow-indigo-200">
                        <Text className="text-white text-sm font-bold">
                          Buy Now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ) : (
                <View className="items-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <Text className="text-slate-400 text-sm">
                    No plans available
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
