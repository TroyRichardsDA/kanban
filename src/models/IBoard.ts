import { IColumn } from "./IColumn";

export interface IBoard {
  id: string;
  name: string;
  visited: boolean;
  columns: IColumn[];
  isCurrent: boolean;
}
