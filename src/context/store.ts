import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "./modals";
import taskEditorReducer from "../features/TaskEditor/taskEditorSlice";
import boardsEditorReducer from "../features/BoardsEditor/boardsEditorSlice";
import themeReducer from "./theme";
import boardsReducer from "./boards";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    modals: modalsReducer,
    taskEditor: taskEditorReducer,
    boards: boardsReducer,
    boardsEditor: boardsEditorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
