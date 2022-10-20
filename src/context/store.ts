import { configureStore } from "@reduxjs/toolkit";
import columnsReducer from "./columns";
import tasksReducer from "./tasks";
import modalsReducer from "./modals";
import addTaskContextReducer from "../features/AddTask/addTaskContext";

export const store = configureStore({
  reducer: {
    columns: columnsReducer,
    tasks: tasksReducer,
    modals: modalsReducer,
    addTask: addTaskContextReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
