import { SubTask } from "./ISubtask";

export interface Task {
  title: string;
  description: string;
  status: string;
  statusListIsOpen: boolean;
  subtasks: SubTask[];
}
