import { configureStore } from "@reduxjs/toolkit";
import docReducer from "./slice/docSlice";
import noteReducer from "./slice/noteSlice";
import teacherReducer from "./slice/teacherSlice";

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    docs: docReducer,
    teacher: teacherReducer,
  },
});

// Types for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
