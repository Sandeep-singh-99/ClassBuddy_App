import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@/global.css";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
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

  useEffect(() => {
    const navigationKey = rootNavigationState?.key;
    if (!navigationKey) return;

    if (!user) {
      // Optional: Redirect to login if not authenticated and not in auth group
      // This logic depends on desired behavior. The original AuthProvider didn't strictly force login on mount for all paths,
      // but logout redirected to login.
      // We can replicate logout redirect in the logout function via a callback or effect here.
      // But the original code only redirected TO dashboard if user exists.
    }

    if (user) {
      if (user.role === "teacher") {
        router.replace("/teacher/(dashboard)/home");
      } else {
        router.replace("/student/(dashboard)/home");
      }
    }
  }, [user, rootNavigationState?.key]);

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
  );
}
