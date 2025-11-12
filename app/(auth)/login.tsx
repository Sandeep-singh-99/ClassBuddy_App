import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Login() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>ClassBuddy</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#ccc"
          secureTextEntry
        />

        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
          <LinearGradient
            colors={["#00c6ff", "#0072ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Sign-up link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

 headerContainer: {
    alignItems: "center",
    marginTop: 150,
  },

  headerText: {
    color: "yellow",
    fontSize: 48,
    fontWeight: "bold",
    shadowOpacity: 5.75,
    shadowRadius: 10,
    shadowColor: "white",
    shadowOffset: { height: 5, width: 5 },
  },

  formContainer: {
    marginTop: 60,
    paddingHorizontal: 30,
  },

  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    padding: 12,
    color: "white",
    marginBottom: 20,
  },

  button: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },

  buttonGradient: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  signupText: {
    color: "#ccc",
    fontSize: 14,
  },

  signupLink: {
    color: "#00c6ff",
    fontSize: 14,
    fontWeight: "600",
  },
});
