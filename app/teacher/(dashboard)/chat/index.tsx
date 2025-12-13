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
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const TeacherChatScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, messages, loading, activeGroupId } = useSelector(
    (state: RootState) => state.chat
  );
  const [currentUserId, setCurrentUserId] = useState<string>("");

  // Teacher has only one group usually, or list of student groups?
  // Backend `get_groups` for Teacher returns "their own group".
  // So we can auto-select it.

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

  useEffect(() => {
    if (groups.length > 0 && !activeGroupId) {
      // Auto select the first group (which is their own group)
      const myGroup = groups[0];
      dispatch(setActiveGroup(myGroup.id));
      dispatch(fetchMessages(myGroup.id));
    }
  }, [groups, activeGroupId, dispatch]);

  const handleSendMessage = (text: string) => {
    if (activeGroupId) {
      dispatch(sendMessage({ groupId: activeGroupId, message: text }));
    }
  };

  if (!currentUserId || (loading && !groups.length)) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!groups.length) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">No chat group available.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-100 bg-white shadow-sm">
        <Text className="text-xl font-bold text-slate-800">
          Class Discussion
        </Text>
      </View>
      {activeGroupId && (
        <ChatWindow
          messages={messages[activeGroupId] || []}
          currentUserId={currentUserId}
          onSendMessage={handleSendMessage}
          groupId={activeGroupId}
        />
      )}
    </View>
  );
};

export default TeacherChatScreen;
