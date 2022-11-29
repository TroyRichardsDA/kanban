import { ISubTask } from "./ISubtask";

export interface ITask {
  id: string;
  title: {
    text: string;
    visited: boolean;
  };
  description: {
    text: string;
    visited: boolean;
  };
  status: string;
  statusListIsOpen: boolean;
  subtasks: ISubTask[];
}
