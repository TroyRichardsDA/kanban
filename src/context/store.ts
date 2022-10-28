import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "./modals";
import taskEditorReducer from "../features/TaskEditor/taskEditorSlice";
import boardsReducer from "./boards";

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    taskEditor: taskEditorReducer,
    boards: boardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
