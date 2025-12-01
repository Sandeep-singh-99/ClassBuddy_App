import { useAppDispatch } from "@/hooks/hooks";
import { DocsDelete } from "@/redux/slice/docSlice";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";

interface DeleteDocButtonProps {
  docId: string;
}

export default function DeleteDocButton({ docId }: DeleteDocButtonProps) {
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      "Delete Document",
      "Are you sure you want to delete this document?",
      [
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
              await dispatch(DocsDelete(docId));
            } catch (error) {
              Alert.alert("Error", "Failed to delete document");
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
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
