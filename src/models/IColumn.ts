import { Task } from "./ITask";

export interface Column {
  id: number;
  name: string;
  tasks: Task[];
}
