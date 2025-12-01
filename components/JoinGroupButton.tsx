import { useJoinGroup } from "@/hooks/useJoinGroup";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface JoinGroupButtonProps {
  groupId: string;
}

export default function JoinGroupButton({ groupId }: JoinGroupButtonProps) {
  const { isJoined, loading, handleJoin } = useJoinGroup(groupId);

  if (isJoined) {
    return (
      <TouchableOpacity
        disabled
        className="flex-row items-center bg-green-100 px-4 py-2 rounded-full border border-green-200"
      >
        <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
        <Text className="text-green-700 font-semibold ml-2 text-sm">
          Joined
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleJoin}
      disabled={loading}
      className="flex-row items-center bg-indigo-600 px-4 py-2 rounded-full shadow-sm active:bg-indigo-700"
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <>
          <Ionicons name="add-circle-outline" size={18} color="white" />
          <Text className="text-white font-semibold ml-2 text-sm">Join</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
