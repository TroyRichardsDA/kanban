import { ITask } from "../../models/ITask";
import styles from "./Task.module.scss";

type Props = {
  task: ITask;
};

function Task(props: Props) {
  const { task } = props;
  const { title, subtasks } = task;
  const subtasksComplete = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <div className={styles.task}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtasks}>
        {subtasksComplete} of {subtasks.length} subtasks
      </p>
    </div>
  );
}

export default Task;
