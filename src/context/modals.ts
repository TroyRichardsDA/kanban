import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addTaskIsOpen: false,
  deleteTypeIsOpen: false,
  taskMiniModalIsOpen: false,
  boardMiniModalIsOpen: false,
  passedData: {} as any,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleAddNewTask: (state, action) => {
      state.addTaskIsOpen = action.payload;
    },
    toggleTaskMiniModal: (state) => {
      state.taskMiniModalIsOpen = !state.taskMiniModalIsOpen;
    },
    toggleBoardMiniModal: (state, action) => {},
    toggleDeleteModal: (state, action) => {
      state.deleteTypeIsOpen = action.payload;
    },
    populateData: (state, action) => {
      state.passedData = action.payload;
    },
    resetModalsSlice: () => initialState,
  },
});

export const {
  toggleAddNewTask,
  toggleDeleteModal,
  populateData,
  resetModalsSlice,
  toggleTaskMiniModal,
  toggleBoardMiniModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
