import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

interface UserTokenPayload {
  sub: string; // email
  id: string; // user_id (assuming backend puts it here, if not we rely on sub)
  role: string;
  exp: number;
}

import { axiosClient } from "./axios";

export const getCurrentUser = async (): Promise<{
  id: string;
  email: string;
  role: string;
} | null> => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (!token) return null;

    // First try decoding
    try {
      const decoded = jwtDecode<any>(token);
      if (decoded.id || decoded.user_id) {
        return {
          id: decoded.id || decoded.user_id,
          email: decoded.sub,
          role: decoded.role,
        };
      }
    } catch (e) {
      // Ignore decode error, try API
    }

    // Fallback to API
    try {
      const response = await axiosClient.get("/mobile/auth/me");
      return {
        id: response.data.id || response.data.user_id,
        email: response.data.email,
        role: response.data.role,
      };
    } catch (apiError) {
      console.error("Failed to fetch user me", apiError);
      return null;
    }
  } catch (error) {
    console.error("Failed to get current user", error);
    return null;
  }
};
