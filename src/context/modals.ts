import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    addTaskIsOpen: false,
  },
  reducers: {
    openAddNewTask: (state, action) => {
      state.addTaskIsOpen = action.payload;
    },
  },
});

export const { openAddNewTask } = modalsSlice.actions;

export default modalsSlice.reducer;
