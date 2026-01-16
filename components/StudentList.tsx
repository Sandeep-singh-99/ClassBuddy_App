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
    <View
      className="bg-white rounded-2xl p-5 border border-slate-100"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <Text className="text-lg font-bold text-slate-900 mb-4">
        Recent Students
      </Text>
      {students.map((student, index) => {
        if (!student) return null;
        return (
          <View
            key={student.id || index}
            className={`flex-row items-center py-3 ${
              index !== students.length - 1 ? "border-b border-slate-50" : ""
            }`}
          >
            <Image
              source={{
                uri:
                  student.image_url ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(student.full_name || "User") +
                    "&background=random",
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#e2e8f0",
              }}
            />
            <View className="flex-1 ml-3">
              <Text className="text-slate-900 font-semibold text-sm">
                {student.full_name || "Unknown"}
              </Text>
              <Text className="text-slate-500 text-xs">
                {student.email || "No email"}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
