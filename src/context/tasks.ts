import { createSlice } from "@reduxjs/toolkit";

interface TaskState {}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    task: [],
    isOpen: false,
  },
  reducers: {
    openAddNewTask: (state) => {
      state.isOpen = true;
    },
  },
});

export const { openAddNewTask } = tasksSlice.actions;

export default tasksSlice.reducer;
