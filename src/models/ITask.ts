import { ISubTask } from "./ISubtask";

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: string;
  statusListIsOpen: boolean;
  subtasks: ISubTask[];
}
