import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";

export default function TeacherLayout() {
  return (
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
            <Ionicons name="folder-open-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(dashboard)/generate_note"
        options={{
          drawerLabel: "Generate Note",
          title: "Generate Note",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(dashboard)/note"
        options={{
          drawerLabel: "Notes",
          title: "Notes",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="journal-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(dashboard)/[id]"
        options={{
          drawerItemStyle: { display: "none" },
          drawerLabel: () => null,
          title: "",
        }}
      />

      <Drawer.Screen
        name="(dashboard)/payment"
        options={{
          drawerLabel: "Payment",
          title: "Payment",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(dashboard)/chat/index"
        options={{
          drawerLabel: "Chat",
          title: "Class Chat",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
