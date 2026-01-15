import CreateSubscriptionDialog from "@/components/CreateSubscriptionDialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  deleteSubscriptionPlan,
  fetchOwnerSubscriptionPlans,
} from "@/redux/slice/subscriptionSlice";
import { ISubscriptionPlan } from "@/types/subscription";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentPage() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { plans, loading } = useAppSelector((state) => state.subscription);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ISubscriptionPlan | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  // Set up the header button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setSelectedPlan(null);
            setModalVisible(true);
          }}
          className="mr-4 bg-indigo-50 p-2 rounded-full"
        >
          <Ionicons name="add" size={24} color="#4f46e5" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchData = async () => {
    await dispatch(fetchOwnerSubscriptionPlans());
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert("Delete Plan", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await dispatch(deleteSubscriptionPlan(id)).unwrap();
          ToastAndroid.show("Plan deleted", ToastAndroid.BOTTOM);
        },
      },
    ]);
  };

  const handleEdit = (plan: ISubscriptionPlan) => {
    setSelectedPlan(plan);
    setModalVisible(true);
  };

  return (
    <LinearGradient
      colors={["#ffffff", "#f8fafc", "#ffffff"]}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
          />
        }
      >
        <View className="mb-6">
          <Text className="text-2xl font-bold text-slate-800">
            Subscription Plans
          </Text>
          <Text className="text-slate-500 mt-1">
            Manage your course subscription offerings
          </Text>
        </View>

        {loading && !refreshing ? (
          <View className="items-center py-20">
            <ActivityIndicator size="large" color="#6366f1" />
          </View>
        ) : plans.length === 0 ? (
          <View className="items-center justify-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <View className="bg-white p-4 rounded-full shadow-sm mb-4">
              <Ionicons name="card-outline" size={32} color="#94a3b8" />
            </View>
            <Text className="text-slate-500 font-medium">
              No subscription plans found
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedPlan(null);
                setModalVisible(true);
              }}
            >
              <Text className="text-indigo-600 font-semibold mt-2">
                Create your first plan
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="gap-4">
            {plans.map((plan) => (
              <View
                key={plan.id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100"
              >
                <View className="flex-row justify-between items-start mb-4">
                  <View>
                    <Text className="text-lg font-bold text-slate-800">
                      {plan.plan_name}
                    </Text>
                    <Text className="text-slate-400 text-xs mt-1">
                      ID: {(plan.id ?? "").slice(0, 8)}...
                    </Text>
                  </View>
                  <View className="bg-indigo-50 px-3 py-1 rounded-full">
                    <Text className="text-indigo-600 font-bold">
                      ₹{plan.amount}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center space-x-2 mb-6">
                  <Ionicons name="time-outline" size={16} color="#64748b" />
                  <Text className="text-slate-500 text-sm">
                    {plan.validity_days} Days Validity
                  </Text>
                </View>

                <View className="flex-row border-t border-slate-50 pt-4 gap-3">
                  <TouchableOpacity
                    onPress={() => handleEdit(plan)}
                    className="flex-1 flex-row items-center justify-center bg-slate-50 py-2.5 rounded-xl active:bg-slate-100"
                  >
                    <Ionicons name="create-outline" size={18} color="#475569" />
                    <Text className="ml-2 font-medium text-slate-600">
                      Edit
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDelete(plan.id, plan.plan_name)}
                    className="flex-1 flex-row items-center justify-center bg-red-50 py-2.5 rounded-xl active:bg-red-100"
                  >
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                    <Text className="ml-2 font-medium text-red-500">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <CreateSubscriptionDialog
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        plan={selectedPlan}
      />
    </LinearGradient>
  );
}
