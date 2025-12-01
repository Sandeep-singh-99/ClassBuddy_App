import { IMember } from "@/types/teacher";
import React from "react";
import { Image, Text, View } from "react-native";

interface StudentListProps {
  students: IMember[];
}

export default function StudentList({ students }: StudentListProps) {
  if (!Array.isArray(students) || students.length === 0) {
    return (
      <View className="items-center justify-center py-10">
        <Text className="text-slate-400">No students found</Text>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <Text className="text-lg font-bold text-slate-900 mb-4">
        Recent Students
      </Text>
      {students.map((student, index) => (
        <View
          key={student.id}
          className={`flex-row items-center py-3 ${
            index !== students.length - 1 ? "border-b border-slate-50" : ""
          }`}
        >
          <Image
            source={{
              uri:
                student.image_url ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(student.full_name) +
                  "&background=random",
            }}
            className="w-10 h-10 rounded-full bg-slate-200"
          />
          <View className="flex-1 ml-3">
            <Text className="text-slate-900 font-semibold text-sm">
              {student.full_name}
            </Text>
            <Text className="text-slate-500 text-xs">{student.email}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
