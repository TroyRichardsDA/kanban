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
    visited: false,
    placeholder: placeholders[getRandomPlaceholder()],
  };
}

const initialState: ITask = {
  id: "",
  title: {
    text: "",
    visited: false,
  },
  description: {
    text: "",
    visited: false,
  },
  status: "",
  statusListIsOpen: false,
  subtasks: [createNewSubtask(), createNewSubtask()],
};

export const taskEditorSlice = createSlice({
  name: "taskEditor",
  initialState,
  reducers: {
    createID: (state, action) => {
      state.id = action.payload;
    },

    updateText: (state, action) => {
      const { name, text } = action.payload;
      return { ...state, [name]: { text } };
    },

    updateVisited: (state, action) => {
      const { name, visited } = action.payload;
      if (name === "title") {
        state.title.visited = visited;
      } else {
        state.description.visited = visited;
      }
    },

    updateSubtasks: (state, action) => {
      const { id, title } = action.payload;
      state.subtasks.map((subtask) => {
        if (subtask.id === id) return (subtask.title = title);
        else return subtask;
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

    updateSubtaskVisited: (state, action) => {
      const { id, bool } = action.payload;
      state.subtasks.map((subtask) => {
        if (subtask.id === id) return (subtask.visited = bool);
        else return subtask;
      });
    },

    updateStatus: (state, action) => {
      state.status = action.payload;
    },

    toggleStatusesList: (state) => {
      state.statusListIsOpen = !state.statusListIsOpen;
    },

    populateTaskEditor: (_, action) => {
      return action.payload;
    },

    resetTaskEditor: () => initialState,
  },
});

export const {
  updateStatus,
  updateSubtasks,
  toggleStatusesList,
  addSubtask,
  removeSubtask,
  resetTaskEditor,
  createID,
  populateTaskEditor,
  updateText,
  updateVisited,
  updateSubtaskVisited,
} = taskEditorSlice.actions;

export default taskEditorSlice.reducer;
