import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function StudentLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ headerShown: true }}>
        <Drawer.Screen
          name="(dashboard)/home"
          options={{
            drawerLabel: "Home",
            title: "Student Dashboard",
          }}
        />
         <Drawer.Screen
          name="(dashboard)/get_all_teacher"
          options={{
            drawerLabel: "Get All Teacher",
            title: "Get All Teacher",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
