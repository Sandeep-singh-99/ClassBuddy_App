import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <View className="px-4 py-3 bg-white border-t border-slate-100 shadow-sm safe-pb-2">
      <View className="flex-row items-end bg-slate-100 rounded-[24px] px-2 py-1 border border-slate-200 focus:border-indigo-300">
        <View className="h-10 w-10 items-center justify-center">
          <Ionicons name="happy-outline" size={24} color="#94a3b8" />
        </View>

        <TextInput
          className="flex-1 min-h-[40px] max-h-[100px] text-base text-slate-800 py-2.5 px-2"
          placeholder="Type a message..."
          placeholderTextColor="#94a3b8"
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={1000}
          textAlignVertical="center"
        />

        <TouchableOpacity
          className={`h-10 w-10 rounded-full items-center justify-center mb-1 ${
            message.trim() ? "bg-indigo-600" : "bg-transparent"
          }`}
          onPress={handleSend}
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator
              color={message.trim() ? "white" : "#94a3b8"}
              size="small"
            />
          ) : (
            <Ionicons
              name="send"
              size={20}
              color={message.trim() ? "white" : "#cbd5e1"}
              style={{ marginLeft: 2 }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageInput;
