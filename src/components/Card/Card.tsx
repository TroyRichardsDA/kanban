import { Task } from "../../models/Task";

type Props = {
  task: Task;
};

function Card(props: Props) {
  const { task } = props;
  const { title, description, status, subtasks } = task;

  return (
    <article>
      <h3>{title}</h3>
    </article>
  );
}

export default Card;
