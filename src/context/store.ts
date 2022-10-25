import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "./modals";
import addTaskReducer from "../features/AddTask/addTaskSlice";
import boardsReducer from "./boards";

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    addTask: addTaskReducer,
    boards: boardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
