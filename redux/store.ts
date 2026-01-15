import { configureStore } from "@reduxjs/toolkit";
import assignmentReducer from "./slice/assignmentSlice";
import chatReducer from "./slice/chatSlice";
import dashboardReducer from "./slice/dashboardSlice";
import docReducer from "./slice/docSlice";
import interviewReducer from "./slice/interviewSlice";
import noteReducer from "./slice/noteSlice";
import submissionReducer from "./slice/submissionSlice";
import teacherReducer from "./slice/teacherSlice";
import subscriptionReducer from "./slice/subscriptionSlice";

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    docs: docReducer,
    teachers: teacherReducer,
    submissions: submissionReducer,
    assignments: assignmentReducer,
    dashboard: dashboardReducer,
    interviews: interviewReducer,
    chat: chatReducer,
    subscription: subscriptionReducer,
  },
});

// Types for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
