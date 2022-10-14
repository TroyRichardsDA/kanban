import React from "react";
import { Task } from "../../models/Task";

interface Props {
  name: string;
  tasks?: Task[];
}

const Column = (props: Props) => {
  const { name, tasks } = props;

  return (
    <section>
      <h2>{name}</h2>
    </section>
  );
};

export default Column;
