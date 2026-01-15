import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { teachersGetNoteById } from "@/redux/slice/noteSlice";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import Markdown from "react-native-markdown-display";

export default function NoteById() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentNote } = useAppSelector((state) => state.notes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(teachersGetNoteById(id));
    }
  }, [dispatch, id]);

  return (
    <ScrollView>
      <View className="flex-1 bg-white/5 p-4">
        <Markdown style={markdownStyle}>{currentNote?.content}</Markdown>
      </View>
    </ScrollView>
  );
}

const markdownStyle = {
  body: {
    color: "#1e293b",
    fontSize: 15,
    lineHeight: 22,
  },
  heading1: {
    fontSize: 26,
    marginBottom: 10,
  },
  heading2: {
    fontSize: 22,
    marginVertical: 10,
  },
  code_block: {
    backgroundColor: "#0f172a",
    color: "white",
    padding: 10,
    borderRadius: 8,
  },
  bullet_list: {
    marginVertical: 6,
  },
};
