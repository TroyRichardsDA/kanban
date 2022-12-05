import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { IBoard } from "../models/IBoard";
import { ITask } from "../models/ITask";

interface BoardsState {
  boards: IBoard[];
}
const boards =
  localStorage.getItem("boards") != null
    ? JSON.parse(localStorage.getItem("boards")!)
    : [
        {
          id: nanoid(),
          visited: false,
          name: "Platform Launch",
          columns: [],
          isCurrent: true,
        },
      ];

const initialState: BoardsState = {
  boards: boards,
};

function findCurrentBoard(state: BoardsState) {
  return state.boards.find((board) => board.isCurrent)!;
}

function findCurrentTask(state: BoardsState, name: string, task: ITask) {
  const currentTask = findCurrentBoard(state)
    .columns.find((col) => col.name === name)!
    .tasks.find((current) => current.id === task.id)!;
  return currentTask;
}

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addNewBoard: (state, action) => {
      state.boards.map((board) => {
        return (board.isCurrent = false);
      });
      state.boards.push(action.payload);

      localStorage.setItem("boards", JSON.stringify(state.boards));
    },

    editBoard: (state, action) => {
      const currentBoard = findCurrentBoard(state);
      const index = state.boards.indexOf(currentBoard);
      state.boards.splice(index, 1, action.payload);

      localStorage.setItem("boards", JSON.stringify(state.boards));
    },

    changeBoard: (state, action) => {
      state.boards.map((board) => {
        if (board.id !== action.payload) {
          return (board.isCurrent = false);
        } else {
          return (board.isCurrent = true);
        }
      });

      localStorage.setItem("boards", JSON.stringify(state.boards));
    },

    deleteBoard: (state) => {
      if (state.boards.length > 1) {
        const currentBoard = findCurrentBoard(state);
        const index = state.boards.indexOf(currentBoard);
        state.boards.splice(index, 1);
        state.boards[0].isCurrent = true;
        localStorage.setItem("boards", JSON.stringify(state.boards));
      } else {
        alert(
          "You must have atleast one board active at all times. Please make another board before trying to delete this one."
        );
      }
    },

    addTaskToColumn: (state, action) => {
      const { column, task } = action.payload;

      const currentBoard = findCurrentBoard(state);

      currentBoard.columns.map((col) => {
        if (col.name === column) {
          return col.tasks.push(task);
        } else {
          return col;
        }
      });

      localStorage.setItem("boards", JSON.stringify(state.boards));
    },

    deleteTask: (state, action) => {
      const { task, status } = action.payload;
      const currentBoard = findCurrentBoard(state);
      const currentTask = findCurrentTask(state, status, task);

      currentBoard.columns.map((col) => {
        const index = col.tasks.indexOf(currentTask);
        if (col.name === status) {
          col.tasks.splice(index, 1);
        }
      });

      localStorage.setItem("boards", JSON.stringify(state.boards));
    },

    editTask: (state, action) => {
      const { task, status } = action.payload;
      const currentBoard = findCurrentBoard(state);
      const currentTask = findCurrentTask(state, status, task);

      currentBoard.columns.map((col) => {
        const index = col.tasks.indexOf(currentTask);
        if (col.name === status) {
          col.tasks.splice(index, 1, task);
        }
      });

      localStorage.setItem("boards", JSON.stringify(state.boards));
    },

    changeTaskStatus: (state, action) => {
      const { newStatus, prev, task } = action.payload;
      const currentBoard = findCurrentBoard(state);
      const currentTask = findCurrentTask(state, prev, task);
      currentTask.status = newStatus;

      currentBoard.columns.map((col) => {
        const index = col.tasks.indexOf(currentTask);
        if (col.name === prev) {
          col.tasks.splice(index, 1);
        }
        if (col.name === newStatus) {
          col.tasks.push(currentTask);
        }
      });

      localStorage.setItem("boards", JSON.stringify(state.boards));
    },

    toggleTaskStatusList: (state, action) => {
      const { task, status } = action.payload;
      const currentTask = findCurrentTask(state, status, task);
      currentTask.statusListIsOpen = !currentTask.statusListIsOpen;
    },
  },
});

export const {
  addTaskToColumn,
  changeTaskStatus,
  toggleTaskStatusList,
  deleteTask,
  deleteBoard,
  editTask,
  addNewBoard,
  editBoard,
  changeBoard,
} = boardsSlice.actions;

export default boardsSlice.reducer;
