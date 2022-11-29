import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  removeSubtask,
  toggleStatusesList,
  updateStatus,
  updateSubtasks,
  addSubtask,
  createID,
  populateTaskEditor,
  resetTaskEditor,
  updateText,
  updateVisited,
  updateSubtaskVisited,
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
import FormInput from "../../components/FormInput/FormInput";

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
    dispatch(resetModalsSlice());
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
    const { title, placeholder, id, visited } = subtask;

    function updateTask(updated: string) {
      dispatch(updateSubtasks({ id, title: updated }));
    }

    function removeTask(subtaskId: string) {
      if (subtasks.length > 1) dispatch(removeSubtask(subtaskId));
    }

    function updateVisited(id: string) {
      dispatch(updateSubtaskVisited({ id, bool: true }));
    }

    return (
      <EditableList
        key={id}
        id={id}
        updateText={updateTask}
        remove={removeTask}
        text={title}
        placeholder={placeholder}
        visited={visited}
        onBlur={updateVisited}
      />
    );
  });

  const reg = /^[a-zA-Z0-9]{2,}$/;

  function handleText(e: any) {
    dispatch(updateText({ name: e.target.name, text: e.target.value }));
  }

  function handleBlur(e: any) {
    dispatch(updateVisited({ name: e.target.name, visited: true }));
  }

  return (
    <Modal toggle={closeModal}>
      <h3 className="editor_header">{passedData ? "Edit" : "Add New"} Task</h3>
      <form className="editor_form" onSubmit={(e) => sendNewTask(e)}>
        <FormInput
          header="Title"
          name="title"
          onChange={handleText}
          value={title.text}
          placeholder="e.g. Take coffee break."
          type="text"
          visited={title.visited}
          onBlur={handleBlur}
        />
        <FormInput
          header="Description"
          name="description"
          onChange={handleText}
          value={description.text}
          rows={5}
          placeholder="e.g It's always good to take a coffee break"
        />
        <label className="editor_label"> Subtasks {subtasksList}</label>
        <button className="editor_add-new" onClick={(e) => addNewSubtask(e)}>
          + Add New Subtask
        </button>
        <label className="editor_label">
          Status
          <StatusSelection
            status={status}
            statusListIsOpen={statusListIsOpen}
            columns={currentBoard.columns}
            changeStatus={changeStatus}
            toggleStatus={toggleStatus}
          />{" "}
        </label>

        <button className="editor_submit-btn" type="submit">
          {passedData ? "Save Changes" : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default TaskEditor;
