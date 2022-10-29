import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { IBoard } from "../models/IBoard";
import { ITask } from "../models/ITask";

interface BoardsState {
  boards: IBoard[];
}

function createBoard() {
  return {
    id: nanoid(),
    name: "Platform Launch",
    columns: [],
    isCurrent: false,
  };
}

const initialState: BoardsState = {
  boards: [
    { id: nanoid(), name: "Platform Launch", columns: [], isCurrent: true },
  ],
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
    addNewBorad: (state, action) => {
      const newBoard: IBoard = {
        id: "12mlksdf",
        name: action.payload,
        columns: [],
        isCurrent: false,
      };
      state.boards.push(newBoard);
    },

    deleteBoard: (state, action) => {},

    addColumnToBoard: (state) => {
      state.boards.map((board) => {
        if (board.isCurrent) {
          const cols = board.columns;

          if (cols.length === 0) {
            cols.push({ id: 1, name: "Todo", tasks: [] });
          } else if (cols.length === 1) {
            cols.push({ id: 2, name: "Doing", tasks: [] });
          } else if (cols.length === 2) {
            cols.push({ id: 3, name: "Done", tasks: [] });
          }
          return board;
        } else {
          return board;
        }
      });
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
    },

    toggleViewTask: (state, action) => {
      const { task, status, bool } = action.payload;
      const currentTask = findCurrentTask(state, status, task);
      currentTask.viewTask = bool;
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
    },

    toggleTaskStatusList: (state, action) => {
      const { task, status } = action.payload;
      const currentTask = findCurrentTask(state, status, task);
      currentTask.statusListIsOpen = !currentTask.statusListIsOpen;
    },

    updateSubTaskIsComplete: (state, action) => {
      const { task, status, id, bool } = action.payload;
      const currentSubTask = findCurrentTask(state, status, task).subtasks.find(
        (subtask) => subtask.id === id
      )!;

      currentSubTask.isCompleted = bool;
    },
  },
});

export const {
  addColumnToBoard,
  addNewBorad,
  addTaskToColumn,
  changeTaskStatus,
  toggleTaskStatusList,
  toggleViewTask,
  updateSubTaskIsComplete,
  deleteTask,
  deleteBoard,
  editTask,
} = boardsSlice.actions;

export default boardsSlice.reducer;
