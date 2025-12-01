import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slice/noteSlice";

export const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
});

// Types for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
