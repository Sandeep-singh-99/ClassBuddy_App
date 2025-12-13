import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function StudentLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: "#2563eb",
          drawerInactiveTintColor: "#4b5563",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#0f172a",
          },
          headerTintColor: "#0f172a",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#0f172a"
              />
            </TouchableOpacity>
          ),
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="(dashboard)/home"
          options={{
            drawerLabel: "Home",
            title: "Student Dashboard",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="(dashboard)/get_all_teacher"
          options={{
            drawerLabel: "Get All Teacher",
            title: "Get All Teacher",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(dashboard)/note"
          options={{
            drawerLabel: "Note",
            title: "Note",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="book-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(dashboard)/doc"
          options={{
            drawerLabel: "Document",
            title: "Document",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="document-text-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="(dashboard)/quiz"
          options={{
            drawerLabel: "Quiz",
            title: "Quiz",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="help-circle-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(dashboard)/assignment"
          options={{
            drawerLabel: "Assignment",
            title: "Assignment",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="clipboard-outline" size={size} color={color} />
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
          name="(dashboard)/career_insight"
          options={{
            drawerLabel: "Career Insight",
            title: "Career Insight",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="stats-chart-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(dashboard)/quiz_ques"
          options={{
            drawerItemStyle: { display: "none" },
            drawerLabel: () => null,
            title: "",
          }}
        />
        <Drawer.Screen
          name="(dashboard)/chat/index"
          options={{
            drawerLabel: "Chat",
            title: "Chat",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
