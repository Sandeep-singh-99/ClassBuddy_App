import { addRealtimeMessage } from "@/redux/slice/chatSlice";
import { AppDispatch } from "@/redux/store";
import * as SecureStore from "expo-secure-store";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const WS_URL =
  "wss://classbuddy-backend-latest.onrender.com/mobile/group-messages/ws";

export const useChatWebSocket = (groupId: string | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!groupId) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      return;
    }

    const connectWebSocket = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (!token) {
          console.error("No auth token found");
          return;
        }

        // Construct URL with token query param or try header if supported by client,
        // but browser WebSocket API doesn't support headers easily,
        // backend supports query param `token`.
        const wsUrl = `${WS_URL}/${groupId}?token=${token}`;

        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
          console.log(`WebSocket Connected to group ${groupId}`);
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            dispatch(addRealtimeMessage(data));
          } catch (error) {
            console.error("Failed to parse WS message", error);
          }
        };

        socket.onclose = (event) => {
          console.log(
            `WebSocket Disconnected from group ${groupId}`,
            event.reason
          );
        };

        socket.onerror = (error) => {
          console.error("WebSocket Error", error);
        };
      } catch (error) {
        console.error("Failed to connect WS", error);
      }
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [groupId, dispatch]);

  return socketRef.current;
};
