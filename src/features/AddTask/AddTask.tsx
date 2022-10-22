import styles from "./AddTask.module.scss";
import ChevronDown from "../../assets/icon-chevron-down.svg";
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
} from "./addTaskContext";
import { useEffect } from "react";
import { ITask } from "../../models/ITask";
import { openAddNewTask } from "../../context/modals";
import { addTaskToColumn } from "../../context/boards";
import { ISubTask } from "../../models/ISubtask";
interface Props {}

const AddTask = (props: Props) => {
  const { boards } = useAppSelector((state) => state.boards);
  const { title, description, subtasks, status, statusListIsOpen } =
    useAppSelector((state) => state.addTask);
  const currentBoard = boards.find((board) => board.isCurrent)!;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateStatus(currentBoard.columns[0].name));
  }, []);

  function changeStatus(e: string) {
    dispatch(updateStatus(e));
  }

  function addNewSubTask(e: any) {
    e.preventDefault();
    dispatch(addSubtask());
  }

  function sendNewTask(e: any) {
    e.preventDefault();
    const validSubtasks = subtasks.filter(
      (subtask: ISubTask) => subtask.title !== ""
    );
    const newTask: ITask = {
      title: title,
      description: description,
      status: status,
      statusListIsOpen: false,
      subtasks: validSubtasks,
    };

    const filledCorretly = Object.values(newTask).every(
      (value) => value != null && value !== ""
    );

    if (filledCorretly) {
      dispatch(addTaskToColumn({ column: status, task: newTask }));
      dispatch(openAddNewTask(false));
      dispatch(resetAddTask());
    }
  }

  const activeSubtasks = subtasks.map((subtask: ISubTask) => {
    const { title, placeholder, id } = subtask;

    return (
      <div key={id} className={styles.subtask}>
        <input
          onChange={(e) =>
            dispatch(updateSubtasks({ id, title: e.target.value }))
          }
          type="text"
          placeholder={placeholder}
          value={title}
        />
        <img onClick={() => dispatch(removeSubtask(id))} src={Cross} alt="" />
      </div>
    );
  });

  const options = currentBoard.columns.map(({ name }, id) => (
    <p
      key={id}
      className={styles.option}
      onClick={(e: any) => changeStatus(e.target.innerText)}
    >
      {name}
    </p>
  ));

  return (
    <div className={styles.modalBg}>
      <div className={styles.modal}>
        <h3 className={styles.header}>Add New Task</h3>
        <form onSubmit={(e) => sendNewTask(e)} className={styles.form}>
          <label className={styles.label}>
            Title
            <input
              onChange={(e) => dispatch(updateTitle(e.target.value))}
              value={title}
              type="text"
              placeholder="e.g Take coffee break"
            />
          </label>
          <label className={styles.label}>
            Description
            <textarea
              onChange={(e) => dispatch(updateDescription(e.target.value))}
              value={description}
              rows={5}
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a litte."
            />
          </label>
          <label className={styles.label}>
            Subtasks
            {activeSubtasks}
          </label>
          <button
            onClick={(e) => addNewSubTask(e)}
            className={styles.addsubtask}
          >
            + Add New Subtask
          </button>
          <label className={styles.label}>
            Status
            <div className={styles.status_container}>
              <input
                className={`${styles.current_option} ${
                  statusListIsOpen && styles.open
                }`}
                readOnly
                onClick={() => dispatch(toggleStatusesList())}
                value={status}
                type="text"
              />
              <img src={ChevronDown} alt="" />
              {statusListIsOpen && (
                <div className={styles.status_options}>{options}</div>
              )}
            </div>
          </label>

          <button type="submit" className={styles.button}>
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
