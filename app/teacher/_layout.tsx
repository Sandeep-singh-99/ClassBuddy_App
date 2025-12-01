import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TeacherLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: "#2563eb",
          drawerInactiveTintColor: "#4b5563",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="(dashboard)/home"
          options={{
            drawerLabel: "Home",
            title: "Teacher Dashboard",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(dashboard)/doc"
          options={{
            drawerLabel: "Documents",
            title: "Documents",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document-text-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(dashboard)/generate_note"
          options={{
            drawerLabel: "Generate Note",
            title: "Generate Note",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document-text-outline" size={size} color={color} />
            ),
          }}
        />
        
      </Drawer>
    </GestureHandlerRootView>
  );
}
