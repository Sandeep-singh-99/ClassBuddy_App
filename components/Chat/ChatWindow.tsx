import { GroupMessage } from "@/types/chat";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import MessageInput from "./MessageInput";

interface ChatWindowProps {
  messages: GroupMessage[];
  currentUserId: string;
  onSendMessage: (message: string) => void;
  groupId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  currentUserId,
  onSendMessage,
  groupId,
}) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(
        () => flatListRef.current?.scrollToEnd({ animated: true }),
        200
      );
    }
  }, [messages]);

  const renderMessage = ({ item }: { item: GroupMessage }) => {
    const isMe = String(item.sender_id) === String(currentUserId);

    // Format Time likely hh:mm AM/PM
    const timeString = new Date(item.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View
        className={`flex-row mb-4 px-4 ${isMe ? "justify-end" : "justify-start"}`}
      >
        {!isMe && (
          <View className="h-8 w-8 rounded-full bg-slate-200 items-center justify-center mr-2 mt-1 overflow-hidden">
            {item.sender?.image_url ? (
              <Image
                source={{ uri: item.sender.image_url }}
                className="h-full w-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-xs font-bold text-slate-600">
                {item.sender?.full_name?.charAt(0) || "U"}
              </Text>
            )}
          </View>
        )}

        <View className="max-w-[75%]">
          {!isMe && (
            <Text className="text-[10px] text-slate-400 ml-1 mb-1">
              {item.sender?.full_name || "User"}
            </Text>
          )}

          {isMe ? (
            <LinearGradient
              colors={["#4f46e5", "#6366f1"]} // Indigo-600 to Indigo-500
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 20,
                borderBottomRightRadius: 2,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
            >
              <Text className="text-base text-white leading-5">
                {item.message}
              </Text>
              <Text className="text-[9px] text-indigo-200 mt-1 text-right">
                {timeString}
              </Text>
            </LinearGradient>
          ) : (
            <View className="bg-white px-4 py-3 rounded-2xl rounded-bl-[2px] shadow-sm border border-slate-100">
              <Text className="text-base text-slate-800 leading-5">
                {item.message}
              </Text>
              <Text className="text-[9px] text-slate-400 mt-1 text-right">
                {timeString}
              </Text>
            </View>
          )}
        </View>

        {isMe && (
          <View className="h-8 w-8 rounded-full bg-indigo-100 items-center justify-center ml-2 mt-1 overflow-hidden">
            {item.sender?.image_url ? (
              <Image
                source={{ uri: item.sender.image_url }}
                className="h-full w-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-xs font-bold text-indigo-600">
                {item.sender?.full_name?.charAt(0) || "M"}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      className="flex-1 bg-slate-50"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 100}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingVertical: 16 }}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
      <MessageInput onSend={onSendMessage} />
    </KeyboardAvoidingView>
  );
};

export default ChatWindow;
