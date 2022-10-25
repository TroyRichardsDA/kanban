import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    addTaskIsOpen: false,
    viewTaskIsOpen: false,
  },
  reducers: {
    toggleAddNewTask: (state, action) => {
      state.addTaskIsOpen = action.payload;
    },
    toggleViewTask: (state, action) => {
      state.viewTaskIsOpen = action.payload;
    },
  },
});

export const { toggleAddNewTask, toggleViewTask } = modalsSlice.actions;

export default modalsSlice.reducer;
