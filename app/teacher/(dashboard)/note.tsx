import DeleteNoteButton from "@/components/DeleteNoteButton";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { teacherNotes } from "@/redux/slice/noteSlice";
import { NoteState } from "@/types/note";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

export default function Note() {
  const dispatch = useAppDispatch();
  const { notes, loading, error } = useAppSelector((state) => state.notes);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(teacherNotes());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(teacherNotes());
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: NoteState }) => (
    <View className="mb-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1 mr-3">
          <Text
            className="text-lg font-bold text-slate-900 mb-1"
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text className="text-xs text-slate-500">
            {item.created_at
              ? new Date(item.created_at).toLocaleDateString()
              : "N/A"}
          </Text>
        </View>
        <View className="flex-row gap-2">
          <DeleteNoteButton noteId={item.id} />
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#ffffff", "#f8fafc", "#ffffff"]}
      className="flex-1"
    >
      <View className="pt-12 px-5 pb-4">
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text className="text-slate-900 text-3xl font-bold">My Notes</Text>
            <Text className="text-slate-500 text-sm">
              Manage your class notes and resources
            </Text>
          </View>
        </View>
      </View>

      {loading && !refreshing ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#6366f1" />
          <Text className="text-slate-400 mt-4">Loading notes...</Text>
        </View>
      ) : (
        <FlatList<NoteState>
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6366f1"
              colors={["#6366f1"]}
            />
          }
          ListEmptyComponent={
            <View className="items-center justify-center mt-20 opacity-50">
              <Ionicons
                name="document-text-outline"
                size={80}
                color="#cbd5e1"
              />
              <Text className="text-slate-900 text-lg font-medium mt-4">
                No notes found
              </Text>
              <Text className="text-slate-500 text-center mt-2 px-10">
                You haven't created any notes yet. Use the generator to get
                started.
              </Text>
            </View>
          }
        />
      )}
    </LinearGradient>
  );
}
