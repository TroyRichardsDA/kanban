import { ITask } from "./ITask";

export interface IColumn {
  id: string;
  name: string;
  visited: boolean;
  tasks: ITask[];
}
