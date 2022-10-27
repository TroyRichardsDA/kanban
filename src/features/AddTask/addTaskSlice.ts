import { createSlice, nanoid } from "@reduxjs/toolkit";
import { ITask } from "../../models/ITask";
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

const initialState: ITask = {
  id: "",
  title: "",
  description: "",
  status: "",
  statusListIsOpen: false,
  viewTask: false,
  subtasks: [createNewSubtask(), createNewSubtask()],
};

export const addTaskSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {
    createID: (state, action) => {
      state.id = action.payload;
    },
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
  createID,
} = addTaskSlice.actions;

export default addTaskSlice.reducer;
