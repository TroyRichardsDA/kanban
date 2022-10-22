import { ISubTask } from "./ISubtask";

export interface ITask {
  title: string;
  description: string;
  status: string;
  statusListIsOpen: boolean;
  subtasks: ISubTask[];
}
