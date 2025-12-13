import ChatList from "@/components/Chat/ChatList";
import ChatWindow from "@/components/Chat/ChatWindow";
import { getCurrentUser } from "@/helper/auth";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import {
  fetchGroups,
  fetchMessages,
  sendMessage,
  setActiveGroup,
} from "@/redux/slice/chatSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const StudentChatScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { groups, messages, loading, activeGroupId } = useSelector(
    (state: RootState) => state.chat
  );
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useChatWebSocket(activeGroupId);

  useEffect(() => {
    const init = async () => {
      const user = await getCurrentUser();
      if (user?.id) {
        setCurrentUserId(user.id);
      }
      dispatch(fetchGroups());
    };
    init();
  }, [dispatch]);

  const handleSelectGroup = (groupId: string) => {
    dispatch(setActiveGroup(groupId));
    dispatch(fetchMessages(groupId));
  };

  const handleSendMessage = (text: string) => {
    if (activeGroupId) {
      dispatch(sendMessage({ groupId: activeGroupId, message: text }));
    }
  };

  const handleBack = () => {
    dispatch(setActiveGroup(null));
  };

  if (!currentUserId && loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (activeGroupId) {
    const activeGroup = groups.find((g) => g.id === activeGroupId);
    return (
      <View className="flex-1 bg-white">
        <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
          <TouchableOpacity onPress={handleBack} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-800">
            {activeGroup?.owner?.name || "Chat"}
          </Text>
        </View>
        <ChatWindow
          messages={messages[activeGroupId] || []}
          currentUserId={currentUserId}
          onSendMessage={handleSendMessage}
          groupId={activeGroupId}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-slate-800">Messages</Text>
      </View>
      {loading && !groups.length ? (
        <ActivityIndicator size="large" color="#2563eb" className="mt-10" />
      ) : (
        <ChatList
          groups={groups}
          onSelectGroup={handleSelectGroup}
          activeGroupId={activeGroupId}
        />
      )}
    </View>
  );
};

export default StudentChatScreen;
