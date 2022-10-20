import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../models/Task";
import { placeholders } from "../../data/placeholders";

function getRandomPlaceholder() {
  return Math.floor(Math.random() * 7);
}

function createNewSubtask() {
  return {
    id: nanoid(),
    title: "",
    isCompleted: false,
    placeholder: placeholders[getRandomPlaceholder()],
  };
}

const initialState: Task = {
  title: "",
  description: "",
  status: "",
  statusListIsOpen: false,
  subtasks: [
    {
      id: nanoid(),
      title: "",
      isCompleted: false,
      placeholder: placeholders[getRandomPlaceholder()],
    },
    {
      id: nanoid(),
      title: "",
      isCompleted: false,
      placeholder: placeholders[getRandomPlaceholder()],
    },
  ],
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
    updateSubtasks: (state, action) => {
      const { id, title } = action.payload;
      state.subtasks.map((subtask) => {
        if (subtask.id === id) {
          return (subtask.title = title);
        } else {
          return null;
        }
      });
    },
    addSubtask: (state) => {
      state.subtasks.push(createNewSubtask());
    },
    removeSubtask: (state, action) => {
      state.subtasks.splice(action.payload, 1);
    },
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
  addSubtask,
  removeSubtask,
} = addTaskContextSlice.actions;

export default addTaskContextSlice.reducer;
