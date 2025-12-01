import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slice/noteSlice";
import docReducer from "./slice/docSlice";

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    docs: docReducer,
  },
});

// Types for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
