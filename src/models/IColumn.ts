import { ITask } from "./ITask";

export interface IColumn {
  id: string;
  name: string;
  tasks: ITask[];
}
