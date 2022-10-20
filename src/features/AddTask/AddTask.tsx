import styles from "./AddTask.module.scss";
import ChevronDown from "../../assets/icon-chevron-down.svg";
import Cross from "../../assets/icon-cross.svg";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  toggleStatusesList,
  updateDescription,
  updateStatus,
  updateTitle,
} from "./addTaskContext";
import { useEffect } from "react";
interface Props {}

const AddTask = (props: Props) => {
  const { columns } = useAppSelector((state) => state.columns);
  const { title, description, subtasks, status, statusListIsOpen } =
    useAppSelector((state) => state.addTask);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateStatus(columns[0].name));
  }, []);

  function changeStatus(e: string) {
    dispatch(updateStatus(e));
  }

  const options = columns.map(({ name }, id) => (
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

        <form className={styles.form}>
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
            <div className={styles.subtask}>
              <input type="text" placeholder="e.g. Make coffee" />
              <img src={Cross} alt="" />
            </div>
          </label>
          <button className={styles.addsubtask}>+ Add New Subtask</button>
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
