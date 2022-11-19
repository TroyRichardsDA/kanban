import { createSlice } from "@reduxjs/toolkit";
import { ISubTask } from "../models/ISubtask";

const initialState = {
  taskEditorIsOpen: false,
  sideBarIsOpen: true,
  boardsEditorIsOpen: false,
  viewTaskIsOpen: false,
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
    toggleBoardsEditor: (state, action) => {
      state.boardsEditorIsOpen = action.payload;
    },
    toggleTaskMiniModal: (state) => {
      state.taskMiniModalIsOpen = !state.taskMiniModalIsOpen;
    },
    toggleBoardMiniModal: (state) => {
      state.boardMiniModalIsOpen = !state.boardMiniModalIsOpen;
    },
    toggleViewTask: (state, action) => {
      state.viewTaskIsOpen = action.payload;
    },
    toggleDeleteModal: (state, action) => {
      state.deleteTypeIsOpen = action.payload;
    },
    toggleAllBoardsModal: (state) => {
      state.allBoardsModalIsOpen = !state.allBoardsModalIsOpen;
    },
    toggleSideBar: (state, action) => {
      state.sideBarIsOpen = action.payload;
    },
    populatePassedData: (state, action) => {
      state.passedData = action.payload;
    },
    resetPassedData: (state) => {
      state.passedData = null;
    },
    resetModalsSlice: () => initialState,
    updateSubTask: (state, action) => {
      const { id, bool } = action.payload;
      const currentSubtask = state.passedData.subtasks.find(
        (subtask: ISubTask) => subtask.id === id
      )!;

      currentSubtask.isCompleted = bool;
    },
    updateCurrentStatus: (state, action) => {
      state.passedData.status = action.payload;
    },
    toggleTaskStatusList: (state) => {
      state.passedData.statusListIsOpen = !state.passedData.statusListIsOpen;
    },
  },
});

export const {
  toggleTaskEditor,
  toggleBoardsEditor,
  toggleViewTask,
  toggleDeleteModal,
  populatePassedData,
  resetModalsSlice,
  toggleTaskMiniModal,
  toggleBoardMiniModal,
  toggleSideBar,
  toggleAllBoardsModal,
  resetPassedData,
  updateSubTask,
  toggleTaskStatusList,
  updateCurrentStatus,
} = modalsSlice.actions;

export default modalsSlice.reducer;
