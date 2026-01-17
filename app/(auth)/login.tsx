import { useAuth } from "@/context/AuthContext";
import { axiosClient } from "@/helper/axios";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const res = await axiosClient.post(
        "/mobile/auth/login",
        formData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const userData = res.data.user;
      const token = res.data.access_token;

      await login(token, userData);
      ToastAndroid.show("Welcome back!", ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show(error.response?.data?.detail || "Login failed", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <LinearGradient
        colors={["#4f46e5", "#7c3aed"]}
        className="flex-1 justify-center px-6"
      >
        <View className="items-center mb-10">
          <View className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-md border border-white/30">
            <Ionicons name="school" size={48} color="white" />
          </View>
          <Text className="text-white text-4xl font-bold tracking-tight">
            ClassBuddy
          </Text>
          <Text className="text-indigo-100 text-lg mt-2">
            Welcome back, please login
          </Text>
        </View>

        <View className="bg-white/10 p-6 rounded-3xl backdrop-blur-lg border border-white/20 shadow-xl">
          <View className="mb-4">
            <Text className="text-indigo-100 text-sm font-medium mb-2 ml-1">
              Email Address
            </Text>
            <View className="flex-row items-center bg-black/20 rounded-xl px-4 border border-white/10 h-12">
              <Ionicons name="mail-outline" size={20} color="#c7d2fe" />
              <TextInput
                className="flex-1 ml-3 text-white text-base"
                placeholder="Enter your email"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-indigo-100 text-sm font-medium mb-2 ml-1">
              Password
            </Text>
            <View className="flex-row items-center bg-black/20 rounded-xl px-4 border border-white/10 h-12">
              <Ionicons name="lock-closed-outline" size={20} color="#c7d2fe" />
              <TextInput
                className="flex-1 ml-3 text-white text-base"
                placeholder="Enter your password"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#c7d2fe"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogin}
            disabled={loading}
            className="bg-white rounded-xl py-3.5 items-center shadow-lg active:scale-95 transform transition-all"
          >
            {loading ? (
              <ActivityIndicator color="#4f46e5" />
            ) : (
              <Text className="text-indigo-600 font-bold text-lg">Log In</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-8">
          <Text className="text-indigo-200">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("/signup")}>
            <Text className="text-white font-bold underline">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
