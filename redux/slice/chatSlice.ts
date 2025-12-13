import { axiosClient } from "@/helper/axios";
import {
  GroupListResponse,
  GroupMessage,
  GroupMessageListResponse,
  TeacherInsight,
} from "@/types/chat";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  groups: TeacherInsight[];
  messages: { [groupId: string]: GroupMessage[] };
  loading: boolean;
  error: string | null;
  activeGroupId: string | null;
}

const initialState: ChatState = {
  groups: [],
  messages: {},
  loading: false,
  error: null,
  activeGroupId: null,
};

// Async Thunks
export const fetchGroups = createAsyncThunk(
  "chat/fetchGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get<GroupListResponse>(
        "/mobile/group-messages/get-group"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch groups"
      );
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (groupId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get<GroupMessageListResponse>(
        `/mobile/group-messages/get-messages/${groupId}`
      );
      return { groupId, messages: response.data.messages };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch messages"
      );
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { groupId, message }: { groupId: string; message: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post<GroupMessage>(
        "/mobile/group-messages/send-message",
        {
          group_id: groupId,
          message,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to send message"
      );
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveGroup(state, action: PayloadAction<string | null>) {
      state.activeGroupId = action.payload;
    },
    addRealtimeMessage(state, action: PayloadAction<GroupMessage>) {
      const message = action.payload;
      const groupId = message.group_id;
      if (!state.messages[groupId]) {
        state.messages[groupId] = [];
      }
      // Avoid duplicates just in case
      if (!state.messages[groupId].find((m) => m.id === message.id)) {
        state.messages[groupId].push(message);
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Groups
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload.groups;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true; // Use a separate loading state for messages if needed, but global is okay for now
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages[action.payload.groupId] = action.payload.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Send Message (Optimistic update or wait for success?)
      // We rely on WebSocket for the incoming message primarily, but we can also add it here if needed.
      // However, the backend says "Broadcast via WebSocket" AND returns the message.
      // To avoid duplicates, we might want to let the WS handle the specific addition, or dedupe.
      // But typically, the sender gets the response immediately.
      // Let's add it here, relying on the dedupe check in `addRealtimeMessage` if that is used for WS too.
      .addCase(sendMessage.fulfilled, (state, action) => {
        // We can add it directly, but let's assume WS will cover it or `addRealtimeMessage` will be called.
        // Actually, for immediate feedback, it's good to add it.
        const msg = action.payload;
        if (!state.messages[msg.group_id]) {
          state.messages[msg.group_id] = [];
        }
        // Check for duplicate by ID
        if (!state.messages[msg.group_id].find((m) => m.id === msg.id)) {
          state.messages[msg.group_id].push(msg);
        }
      });
  },
});

export const { setActiveGroup, addRealtimeMessage, clearError } =
  chatSlice.actions;
export default chatSlice.reducer;
