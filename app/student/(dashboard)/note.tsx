import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { NoteState } from "@/types/note" 
import { studentJoinGroupNote } from "@/redux/slice/noteSlice"

export default function Note() {
  const { notes, loading, error } = useAppSelector(
    (state) => state.notes
  )

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(studentJoinGroupNote());
  }, [dispatch]);

  const renderItem = ({
    item,
  }: {
    item: NoteState
  }) => (
    <View className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
      <Text className="text-lg font-semibold text-white">
        {item.title}
      </Text>

      <Text
        className="text-gray-400 mt-2"
        numberOfLines={3}
      >
        {item.content}
      </Text>

      <View className="mt-3">
        <Text className="text-xs text-sky-400">
          {item.created_at
            ? new Date(item.created_at).toLocaleDateString()
            : ""}
        </Text>
      </View>
    </View>
  )

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-red-500 text-center">
          {error}
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1 px-5 pt-5">
      <Text className="text-3xl font-bold mb-6">
        Teacher Notes
      </Text>

      <FlatList<NoteState>
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-gray-400 text-center mt-10">
            No Notes Found
          </Text>
        }
      />
    </View>
  )
}
