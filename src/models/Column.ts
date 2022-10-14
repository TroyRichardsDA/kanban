import { Task } from "./Task";

export interface Column {
  name: string;
  tasks?: Task[];
}
