import { AuthProvider } from "@/context/AuthContext";
import "@/global.css";
import { Stack } from "expo-router";
import "react-native-reanimated";
import ToastContainer from "toastify-react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="student" options={{ headerShown: false }} />
        <Stack.Screen name="teacher" options={{ headerShown: false }} />
      </Stack>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </AuthProvider>
  );
}
