import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addTaskIsOpen: false,
  deleteTypeIsOpen: false,
  passedData: {} as any,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleAddNewTask: (state, action) => {
      state.addTaskIsOpen = action.payload;
    },
    toggleDeleteModal: (state, action) => {
      state.deleteTypeIsOpen = action.payload;
    },
    populateData: (state, action) => {
      state.passedData = action.payload;
    },
    reset: () => initialState,
  },
});

export const { toggleAddNewTask, toggleDeleteModal, populateData, reset } =
  modalsSlice.actions;

export default modalsSlice.reducer;
