import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { toggleViewTask } from "../../context/modals";
import ViewTask from "../../features/ViewTask/ViewTask";
import { ITask } from "../../models/ITask";
import styles from "./Task.module.scss";

type Props = {
  task: ITask;
};

function Task(props: Props) {
  const { task } = props;
  const { viewTaskIsOpen } = useAppSelector((state) => state.modals);

  const { title, subtasks } = task;
  const dispatch = useAppDispatch();
  const subtasksComplete = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  function viewTask() {
    dispatch(toggleViewTask(true));
  }

  return (
    <div onClick={() => viewTask()} className={styles.task}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtasks}>
        {subtasksComplete} of {subtasks.length} subtasks
      </p>
      {viewTaskIsOpen && <ViewTask task={task} />}
    </div>
  );
}

export default Task;
