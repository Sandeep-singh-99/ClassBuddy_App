import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  JoinedCheckStatus,
  joinTeacherGroup,
} from "@/redux/slice/teacherSlice";
import { useEffect } from "react";
import { Toast } from "toastify-react-native";

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
      Toast.success("Joined group successfully");
    } catch (error) {
      Toast.error("Failed to join group");
    }
  };

  return {
    isJoined,
    loading,
    handleJoin,
  };
};
