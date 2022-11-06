import { toggleViewTask } from "../../context/boards";
import { useAppDispatch } from "../../context/hooks";
import ViewTask from "../../features/ViewTask/ViewTask";
import { ITask } from "../../models/ITask";

type Props = {
  task: ITask;
};

function Task(props: Props) {
  const { task } = props;
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
    <div onClick={() => openTask()} className="task_container">
      <h3 className="task_title">{title}</h3>
      <p className="task_subtasks">
        {subtasksComplete} of {subtasks.length} subtasks
      </p>
      <div onClick={(e) => preventChild(e)}>
        {viewTask && <ViewTask task={task} />}
      </div>
    </div>
  );
}

export default Task;
