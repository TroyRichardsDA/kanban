import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../models/Task";

const initialState: Task = {
  title: "",
  description: "",
  status: "",
  statusListIsOpen: false,
  subtasks: [],
};

export const addTaskContextSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    updateSubtasks: (state, action) => {},
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    toggleStatusesList: (state) => {
      state.statusListIsOpen = !state.statusListIsOpen;
    },
  },
});

export const {
  updateTitle,
  updateDescription,
  updateStatus,
  updateSubtasks,
  toggleStatusesList,
} = addTaskContextSlice.actions;

export default addTaskContextSlice.reducer;
