import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  removeSubtask,
  toggleStatusesList,
  updateDescription,
  updateStatus,
  updateSubtasks,
  updateTitle,
  addSubtask,
  createID,
  populateTaskEditor,
  resetTaskEditor,
} from "./taskEditorSlice";
import { useEffect } from "react";
import { ITask } from "../../models/ITask";
import { resetModalsSlice, toggleTaskEditor } from "../../context/modals";
import { addTaskToColumn, editTask } from "../../context/boards";
import { ISubTask } from "../../models/ISubtask";
import Modal from "../../components/Modals/Modal";
import { nanoid } from "@reduxjs/toolkit";
import EditableList from "../../components/EditableList/EditableList";
import StatusSelection from "../../components/StatusSelection/StatusSelection";
import styles from "../../styles/editors.module.scss";

const TaskEditor = () => {
  const { boards } = useAppSelector((state) => state.boards);
  const { title, description, subtasks, status, statusListIsOpen, id } =
    useAppSelector((state) => state.taskEditor);
  const { passedData } = useAppSelector((state) => state.modals);
  const currentBoard = boards.find((board) => board.isCurrent)!;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!passedData) {
      dispatch(updateStatus(currentBoard.columns[0].name));
      dispatch(createID(nanoid()));
    } else {
      dispatch(populateTaskEditor(passedData));
    }
  }, []);

  function changeStatus(e: string) {
    dispatch(updateStatus(e));
  }

  function toggleStatus() {
    dispatch(toggleStatusesList());
  }

  function addNewSubtask(e: any) {
    e.preventDefault();
    dispatch(addSubtask());
  }

  function closeModal() {
    dispatch(toggleTaskEditor(false));
    dispatch(resetTaskEditor());
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
      viewTask: false,
      subtasks: validSubtasks,
    };

    const filledCorretly =
      Object.values(newTask).every((value) => value != null && value !== "") &&
      newTask.subtasks.length > 0;

    if (filledCorretly) {
      dispatch(toggleTaskEditor(false));
      dispatch(resetTaskEditor());

      if (!passedData) {
        dispatch(addTaskToColumn({ column: status, task: newTask }));
      } else {
        dispatch(editTask({ task: newTask, status }));
      }

      dispatch(resetModalsSlice());
    }
  }

  const subtasksList = subtasks.map((subtask: ISubTask) => {
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
      <h3 className={styles.header}>{passedData ? "Edit" : "Add New"} Task</h3>
      <form className={styles.form} onSubmit={(e) => sendNewTask(e)}>
        <label className={styles.label}>
          Title
          <input
            onChange={(e) => dispatch(updateTitle(e.target.value))}
            value={title}
            placeholder="e.g. Take coffee break."
            type="text"
          />
        </label>
        <label className={styles.label}>
          Description
          <textarea
            onChange={(e) => dispatch(updateDescription(e.target.value))}
            value={description}
            rows={5}
            placeholder="e.g. It's always good to take a break."
          />
        </label>
        <label className={styles.label}> Subtasks {subtasksList}</label>
        <button className={styles.addNew} onClick={(e) => addNewSubtask(e)}>
          {" "}
          + Add New Subtask{" "}
        </button>
        <label className={styles.label}>
          Status{" "}
          <StatusSelection
            status={status}
            statusListIsOpen={statusListIsOpen}
            columns={currentBoard.columns}
            changeStatus={changeStatus}
            toggleStatus={toggleStatus}
          />{" "}
        </label>

        <button className={styles.submitButton} type="submit">
          {passedData ? "Save Changes" : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default TaskEditor;
