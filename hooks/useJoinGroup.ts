import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  JoinedCheckStatus,
  joinTeacherGroup,
} from "@/redux/slice/teacherSlice";
import { useEffect } from "react";
import { ToastAndroid } from "react-native";

export const useJoinGroup = (groupId: string) => {
  const dispatch = useAppDispatch();
  const isJoined = useAppSelector(
    (state) => state.teachers.joinedStatus[groupId]
  );
  const loading = useAppSelector((state) => state.teachers.loading);

  useEffect(() => {
    if (groupId) {
      dispatch(JoinedCheckStatus(groupId));
    }
  }, [groupId, dispatch]);

  const handleJoin = async () => {
    if (!groupId) return;
    try {
      await dispatch(joinTeacherGroup(groupId)).unwrap();
      ToastAndroid.show("Joined group successfully", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Failed to join group", ToastAndroid.SHORT);
    }
  };

  return {
    isJoined,
    loading,
    handleJoin,
  };
};
