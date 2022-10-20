import { SubTask } from "./Subtask";

export interface Task {
  title: string;
  description: string;
  status: string;
  statusListIsOpen: boolean;
  subtasks?: SubTask[];
}
