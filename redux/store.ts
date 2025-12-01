import { configureStore } from "@reduxjs/toolkit";
import docReducer from "./slice/docSlice";
import noteReducer from "./slice/noteSlice";
import teacherReducer from "./slice/teacherSlice";
import submissionReducer from "./slice/submissionSlice";
import assignmentReducer from "./slice/assignmentSlice";
import dashboardReducer from "./slice/dashboardSlice";
import interviewReducer from "./slice/interviewSlice";

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    docs: docReducer,
    teachers: teacherReducer,
    submissions: submissionReducer,
    assignments: assignmentReducer,
    dashboard: dashboardReducer,
    interviews: interviewReducer,

  },
});

// Types for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
