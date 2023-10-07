import { ColumnsType } from "./columnsType";

export type BoardDataType = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  columns: ColumnsType[];
};
