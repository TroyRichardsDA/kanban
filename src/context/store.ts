import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "./modals";
import addTaskContextReducer from "../features/AddTask/addTaskContext";
import boardsReducer from "./boards";

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    addTask: addTaskContextReducer,
    boards: boardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
