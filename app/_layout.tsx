import { AuthProvider } from "@/context/AuthContext";
import "@/global.css";
import { Stack } from "expo-router";
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

export default function RootLayout() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
