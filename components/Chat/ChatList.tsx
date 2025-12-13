import { TeacherInsight } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface ChatListProps {
  groups: TeacherInsight[];
  onSelectGroup: (groupId: string) => void;
  activeGroupId: string | null;
}

const ChatList: React.FC<ChatListProps> = ({
  groups,
  onSelectGroup,
  activeGroupId,
}) => {
  const renderItem = ({ item }: { item: TeacherInsight }) => {
    const isSelected = activeGroupId === item.id;
    return (
      <TouchableOpacity
        className={`mx-4 my-2 p-4 flex-row items-center rounded-2xl bg-white shadow-sm border border-slate-100 ${
          isSelected ? "border-indigo-200 bg-indigo-50" : ""
        }`}
        onPress={() => onSelectGroup(item.id)}
        style={{
          shadowColor: "#64748b",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <View className="h-14 w-14 rounded-full bg-indigo-100 items-center justify-center mr-4 border border-indigo-200 overflow-hidden">
          {item.image_url ? (
            <Image
              source={{ uri: item.image_url }}
              className="h-full w-full"
              resizeMode="cover"
            />
          ) : (
            <Text className="text-xl font-bold text-indigo-600">
              {item.group_name?.charAt(0) || "G"}
            </Text>
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-1">
            <Text
              className="text-base font-bold text-slate-800 flex-1 mr-2"
              numberOfLines={1}
            >
              {item.group_name || "Unknown Group"}
            </Text>
            {/* Potential timestamp here in future */}
          </View>
          <Text className="text-sm text-slate-500" numberOfLines={1}>
            {item.group_des || "Tap to start chatting"}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingVertical: 12 }}
      ListEmptyComponent={
        <View className="p-10 items-center">
          <View className="bg-slate-100 p-4 rounded-full mb-4">
            <Ionicons name="chatbubbles-outline" size={32} color="#94a3b8" />
          </View>
          <Text className="text-slate-500 font-medium">No active chats</Text>
        </View>
      }
    />
  );
};

export default ChatList;
