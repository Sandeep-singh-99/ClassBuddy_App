import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* User Profile Section */}
        <LinearGradient
          colors={["#2563eb", "#1e3a8a"]}
          style={{
            padding: 24,
            alignItems: "center",
            marginBottom: 8,
            paddingTop: 48,
            marginHorizontal: -20,
            marginTop: -5,
          }}
        >
          <View className="p-1 rounded-full border-2 border-white/20 mb-3 shadow-lg bg-white/10">
            <Image
              source={
                user?.image_url
                  ? { uri: user.image_url }
                  : require("@/assets/images/react-logo.png")
              }
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
              }}
              contentFit="cover"
              transition={500}
            />
          </View>
          <Text className="text-white text-xl font-bold tracking-wide shadow-sm">
            {user?.full_name || "User Name"}
          </Text>
          <Text className="text-blue-100 text-sm mb-4 font-medium opacity-90">
            {user?.email || "user@example.com"}
          </Text>
          <View className="bg-white/20 px-4 py-1.5 rounded-full border border-white/30 backdrop-blur-md">
            <Text className="text-white text-xs font-bold uppercase tracking-widest">
              {user?.role || "Student"}
            </Text>
          </View>
        </LinearGradient>

        {/* Drawer Items */}
        <View className="flex-1 px-2 pt-2">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Logout Section */}
      <View className="p-5 border-t border-gray-100 pb-8">
        <TouchableOpacity
          onPress={logout}
          className="flex-row items-center space-x-3 px-4 py-3 rounded-xl active:bg-red-50"
        >
          <View className="bg-red-50 p-2 rounded-full">
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          </View>
          <Text className="text-gray-700 font-medium text-base ml-2">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
