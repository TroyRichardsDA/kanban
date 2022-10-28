import { IColumn } from "./IColumn";

export interface IBoard {
  id: string;
  name: string;
  columns: IColumn[];
  isCurrent: boolean;
}
