import { useAppDispatch } from "@/hooks/hooks";
import { deleteNoteById } from "@/redux/slice/noteSlice";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";

interface DeleteNoteButtonProps {
  noteId: string;
}

export default function DeleteNoteButton({ noteId }: DeleteNoteButtonProps) {
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setDeleting(true);
          try {
            await dispatch(deleteNoteById(noteId));
          } catch (error) {
            Alert.alert("Error", "Failed to delete note");
          } finally {
            setDeleting(false);
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={handleDelete}
      disabled={deleting}
      className="p-2 rounded-full bg-red-50"
    >
      {deleting ? (
        <ActivityIndicator size="small" color="#ef4444" />
      ) : (
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      )}
    </TouchableOpacity>
  );
}
