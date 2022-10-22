import { Column } from "./IColumn";

export interface Board {
  name: string;
  columns: Column[];
  isCurrent: boolean;
}
