import { Task } from "./Task";

export interface Column {
  id: number;
  name: string;
  tasks?: Task[];
}
