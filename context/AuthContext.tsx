import { axiosClient } from "@/helper/axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  const RefreshUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        return;
      }
      const response = await axiosClient.get("/mobile/auth/me");
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      // Toast.error("Failed to refresh user data");
      await logout();
    }
  };

  const login = async (token: string, userData: any) => {
    await SecureStore.setItemAsync("token", token);
    setUser(userData);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  };

  useEffect(() => {
    RefreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, RefreshUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
