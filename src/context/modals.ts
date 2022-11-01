import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskEditorIsOpen: false,
  deleteTypeIsOpen: false,
  taskMiniModalIsOpen: false,
  boardMiniModalIsOpen: false,
  allBoardsModalIsOpen: false,
  passedData: null as any,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleTaskEditor: (state, action) => {
      state.taskEditorIsOpen = action.payload;
    },
    toggleTaskMiniModal: (state) => {
      state.taskMiniModalIsOpen = !state.taskMiniModalIsOpen;
    },
    toggleBoardMiniModal: (state) => {
      state.boardMiniModalIsOpen = !state.boardMiniModalIsOpen;
    },
    toggleDeleteModal: (state, action) => {
      state.deleteTypeIsOpen = action.payload;
    },
    toggleAllBoardsModal: (state) => {
      state.allBoardsModalIsOpen = !state.allBoardsModalIsOpen;
    },
    populatePassedData: (state, action) => {
      state.passedData = action.payload;
    },

    resetModalsSlice: () => initialState,
  },
});

export const {
  toggleTaskEditor,
  toggleDeleteModal,
  populatePassedData,
  resetModalsSlice,
  toggleTaskMiniModal,
  toggleBoardMiniModal,
  toggleAllBoardsModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
