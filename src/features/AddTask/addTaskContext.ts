import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Task } from "../../models/ITask";
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
  subtasks: [createNewSubtask(), createNewSubtask()],
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
      const subtask = state.subtasks.find(
        (subtask) => subtask.id === action.payload
      );
      const index = state.subtasks.indexOf(subtask!);
      state.subtasks.splice(index, 1);
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    toggleStatusesList: (state) => {
      state.statusListIsOpen = !state.statusListIsOpen;
    },
    resetAddTask: () => initialState,
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
  resetAddTask,
} = addTaskContextSlice.actions;

export default addTaskContextSlice.reducer;
