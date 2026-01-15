import { useAuth } from "@/context/AuthContext";
import { axiosClient } from "@/helper/axios";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Toast } from "toastify-react-native";

export default function SignUp() {
  const router = useRouter();
  const { login } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [role, setRole] = useState<string>("student");
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSignup = async () => {
    if (!fullName || !email || !password || !role) {
      Toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);

      if (image) {
        // @ts-ignore
        formData.append("image", {
          uri: image,
          name: "profile.jpg",
          type: "image/jpeg",
        });
      }

      const res = await axiosClient.post("/mobile/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const userData = res.data.user;
      const token = res.data.access_token;

      Toast.success("Registration successful");
      await login(token, userData);
    } catch (error: any) {
      Toast.error(error.response?.data?.detail || "Registration failed");
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
        <View className="items-center mb-8 mt-10">
          <Text className="text-white text-3xl font-bold tracking-tight">
            Create Account
          </Text>
          <Text className="text-indigo-100 text-base mt-1">
            Join ClassBuddy today
          </Text>
        </View>

        <View className="bg-white/10 p-6 rounded-3xl backdrop-blur-lg border border-white/20 shadow-xl">
          <View className="items-center mb-6">
            <TouchableOpacity
              onPress={pickImage}
              className="w-24 h-24 rounded-full bg-white/20 items-center justify-center border-2 border-white/30 overflow-hidden"
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center">
                  <Ionicons name="camera" size={32} color="#e0e7ff" />
                  <Text className="text-indigo-100 text-xs mt-1">Upload</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-indigo-100 text-sm font-medium mb-2 ml-1">
              Full Name
            </Text>
            <View className="flex-row items-center bg-black/20 rounded-xl px-4 border border-white/10 h-12">
              <Ionicons name="person-outline" size={20} color="#c7d2fe" />
              <TextInput
                className="flex-1 ml-3 text-white text-base"
                placeholder="Enter your full name"
                placeholderTextColor="#94a3b8"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

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

          <View className="mb-4 z-50">
            <Text className="text-indigo-100 text-sm font-medium mb-2 ml-1">
              Role
            </Text>
            <DropDownPicker
              open={open}
              value={role}
              items={[
                { label: "Student", value: "student" },
                { label: "Teacher", value: "teacher" },
              ]}
              setOpen={setOpen}
              setValue={setRole}
              theme="DARK"
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                borderColor: "rgba(255,255,255,0.1)",
                borderRadius: 12,
                height: 48,
              }}
              textStyle={{ color: "#fff", fontSize: 16 }}
              dropDownContainerStyle={{
                backgroundColor: "#1e1b4b",
                borderColor: "rgba(255,255,255,0.1)",
              }}
              placeholder="Select your role"
            />
          </View>

          <View className="mb-6">
            <Text className="text-indigo-100 text-sm font-medium mb-2 ml-1">
              Password
            </Text>
            <View className="flex-row items-center bg-black/20 rounded-xl px-4 border border-white/10 h-12">
              <Ionicons name="lock-closed-outline" size={20} color="#c7d2fe" />
              <TextInput
                className="flex-1 ml-3 text-white text-base"
                placeholder="Create a password"
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
            onPress={handleSignup}
            disabled={loading}
            className="bg-white rounded-xl py-3.5 items-center shadow-lg active:scale-95 transform transition-all"
          >
            {loading ? (
              <ActivityIndicator color="#4f46e5" />
            ) : (
              <Text className="text-indigo-600 font-bold text-lg">Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-6 mb-10">
          <Text className="text-indigo-200">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text className="text-white font-bold underline">Log In</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
