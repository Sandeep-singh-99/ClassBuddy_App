import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@/global.css";
import {
  Stack,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { Provider } from "react-redux";
import ToastContainer from "toastify-react-native";
import { store } from "../redux/store";

// Configure Reanimated logger
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Disable strict mode
});

function MainLayout() {
  const { user } = useAuth();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  const segments = useSegments();

  useEffect(() => {
    const navigationKey = rootNavigationState?.key;
    if (!navigationKey) return;

    if (user) {
      if (user.role === "teacher") {
        if (segments[0] !== "teacher") {
          router.replace("/teacher/(dashboard)/home");
        }
      } else {
        if (segments[0] !== "student") {
          router.replace("/student/(dashboard)/home");
        }
      }
    }
  }, [user, rootNavigationState?.key, segments]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="student" options={{ headerShown: false }} />
      <Stack.Screen name="teacher" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AuthProvider>
          <MainLayout />

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
      </Provider>
    </GestureHandlerRootView>
  );
}
