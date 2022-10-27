import styles from "./AddTask.module.scss";
import Cross from "../../assets/icon-cross.svg";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  removeSubtask,
  toggleStatusesList,
  updateDescription,
  updateStatus,
  updateSubtasks,
  updateTitle,
  addSubtask,
  resetAddTask,
  createID,
} from "./addTaskSlice";
import { useEffect } from "react";
import { ITask } from "../../models/ITask";
import { toggleAddNewTask } from "../../context/modals";
import { addTaskToColumn } from "../../context/boards";
import { ISubTask } from "../../models/ISubtask";
import Modal from "../../components/Modals/Modal";
import { nanoid } from "@reduxjs/toolkit";
import EditableList from "../../components/EditableList/EditableList";
import TaskTemplate from "../../components/TaskTemplate/TaskTemplate";

const AddTask = () => {
  const { boards } = useAppSelector((state) => state.boards);
  const {
    title,
    description,
    subtasks,
    status,
    statusListIsOpen,
    id,
    viewTask,
  } = useAppSelector((state) => state.addTask);
  const currentBoard = boards.find((board) => board.isCurrent)!;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateStatus(currentBoard.columns[0].name));
    dispatch(createID(nanoid()));
  }, []);

  function changeStatus(e: string) {
    dispatch(updateStatus(e));
  }

  function toggleStatus() {
    dispatch(toggleStatusesList());
  }

  function addNewSubTask(e: any) {
    e.preventDefault();
    dispatch(addSubtask());
  }

  function closeModal() {
    dispatch(toggleAddNewTask(false));
  }

  function sendNewTask(e: any) {
    e.preventDefault();
    const validSubtasks = subtasks.filter(
      (subtask: ISubTask) => subtask.title !== ""
    );
    const newTask: ITask = {
      id,
      title,
      description,
      status,
      statusListIsOpen: false,
      viewTask,
      subtasks: validSubtasks,
    };

    const filledCorretly = Object.values(newTask).every(
      (value) => value != null && value !== ""
    );

    if (filledCorretly) {
      dispatch(addTaskToColumn({ column: status, task: newTask }));
      dispatch(toggleAddNewTask(false));
      dispatch(resetAddTask());
    }
  }

  function handleTitle(e: string) {
    dispatch(updateTitle(e));
  }

  function handleDescription(e: string) {
    dispatch(updateDescription(e));
  }

  const activeSubtasks = subtasks.map((subtask: ISubTask) => {
    const { title, placeholder, id } = subtask;

    function updateTask(updated: string) {
      dispatch(updateSubtasks({ id, title: updated }));
    }

    function removeTask(subtaskId: string) {
      dispatch(removeSubtask(subtaskId));
    }

    return (
      <EditableList
        key={id}
        id={id}
        updateText={updateTask}
        remove={removeTask}
        text={title}
        placeholder={placeholder}
      />
    );
  });

  return (
    <Modal toggle={closeModal}>
      <TaskTemplate
        heading="Add New Task"
        title={title}
        status={status}
        statusListIsOpen={statusListIsOpen}
        columns={currentBoard.columns}
        subtaskList={activeSubtasks}
        changeStatus={changeStatus}
        toggleStatus={toggleStatus}
        updateTitle={handleTitle}
        updateDescription={handleDescription}
        addNewSubtask={addNewSubTask}
        sendTask={sendNewTask}
      />
    </Modal>
  );
};

export default AddTask;
