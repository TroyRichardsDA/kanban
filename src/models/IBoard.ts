import { IColumn } from "./IColumn";

export interface IBoard {
  name: string;
  columns: IColumn[];
  isCurrent: boolean;
}
