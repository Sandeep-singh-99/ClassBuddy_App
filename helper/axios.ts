import axios from "axios";
import * as SecureStore from "expo-secure-store";

// const VITE_API_URL = "http://127.0.0.1:8000";
// "http://192.168.1.1:8000",
export const axiosClient = axios.create({
  baseURL: "http://192.168.1.8:8000",
  withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
