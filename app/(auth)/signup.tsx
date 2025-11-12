import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";

export default function SignUp() {
  const [image, setImage] = useState(null);
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);

  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera" size={40} color="#bbb" />
              <Text style={styles.imageText}>Upload</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Role</Text>
        <DropDownPicker
          open={open}
          value={role}
          items={[
            { label: "Student", value: "student" },
            { label: "Teacher", value: "teacher" },
          ]}
          setOpen={setOpen}
          setValue={setRole}
          theme="DARK"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            borderColor: "#FFD700",
            marginBottom: 20,
          }}
          textStyle={{ color: "#fff" }}
          dropDownContainerStyle={{ backgroundColor: "#1a1a1a" }}
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
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>If you already have an account, </Text>
          <TouchableOpacity onPress={() => router.navigate("/login")}>
            <Text style={styles.loginLink}>Log In</Text>
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
    marginTop: 50,
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
    marginTop: 30,
    paddingHorizontal: 30,
  },

  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#666",
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
  },

  imageText: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 4,
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

  // pickerWrapper: {
  //   backgroundColor: "rgba(0,0,0,0.35)",
  //   borderRadius: 12,
  //   borderWidth: 1,
  //   borderColor: "rgba(255,215,0,0.4)", // soft golden border
  //   overflow: "hidden",
  //   marginBottom: 20,
  //   shadowColor: "#FFD700",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 6,
  //   elevation: 4,
  // },

  // picker: {
  //   color: "#fff",
  //   height: 50,
  //   paddingHorizontal: 12,
  //   backgroundColor: "transparent",
  //   fontSize: 16,
  // },

  resultText: {
    marginTop: 20,
    color: "#fff",
    fontSize: 16,
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

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  loginText: {
    color: "#ccc",
    fontSize: 14,
  },

  loginLink: {
    color: "#00c6ff",
    fontSize: 14,
    fontWeight: "600",
  },
});
