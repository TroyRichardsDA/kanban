import { toggleViewTask } from "../../context/boards";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import ViewTask from "../../features/ViewTask/ViewTask";
import { ITask } from "../../models/ITask";
import styles from "./Task.module.scss";

type Props = {
  task: ITask;
};

function Task(props: Props) {
  const { task } = props;
  const { viewTaskIsOpen } = useAppSelector((state) => state.modals);

  const { title, subtasks, status, viewTask } = task;
  const dispatch = useAppDispatch();
  const subtasksComplete = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  function openTask() {
    dispatch(toggleViewTask({ task, status, bool: true }));
  }

  function preventChild(e: any) {
    e.stopPropagation();
  }

  return (
    <div onClick={() => openTask()} className={styles.task}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtasks}>
        {subtasksComplete} of {subtasks.length} subtasks
      </p>
      <div onClick={(e) => preventChild(e)}>
        {viewTask && <ViewTask task={task} />}
      </div>
    </div>
  );
}

export default Task;
