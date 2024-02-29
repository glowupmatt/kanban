"use client";

import { useContext } from "react";
import axios from "axios";
import { DataContext } from "@/context/AppContext";
import { ColumnsType } from "@/types/columnsType";
import { BoardDataType } from "@/types/boardData";

const useCreateColumnSubmit = (
  localUpdatedState: boolean,
  oldBoardColumns: string[],
  columns: ColumnsType[],
  newBoardColumns: string[],
  boardName: string,
  title: string,
  deleteColumnIdHolder: string[],
  displayBoard: BoardDataType,
  setDidBoardNameChange: React.Dispatch<React.SetStateAction<boolean>>,
  setNewBoardColumns: React.Dispatch<React.SetStateAction<string[]>>,
  setDeleteColumnIdHolder: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const { setUpdated } = useContext(DataContext);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (localUpdatedState === true && oldBoardColumns.length > 0) {
        columns.map(async (column: any, index: number) => {
          const data = {
            title: oldBoardColumns[index],
          };
          await axios
            .put(`/api/createBoard/${displayBoard.id}/${column.id}`, {
              ...data,
            })
            .finally(() => setUpdated(true));
        });
      }
      if (newBoardColumns.length > 0 || boardName !== title) {
        const data = {
          title: boardName === "" ? title : boardName,
          columns: newBoardColumns.map((title: string) => title),
        };
        await axios
          .put(`/api/createBoard/${displayBoard.id}`, {
            ...data,
            ...data.columns,
          })
          .finally(() => setUpdated(true));
      }
      if (deleteColumnIdHolder.length > 0) {
        deleteColumnIdHolder.map(async (id: string) => {
          await axios
            .delete(`/api/createBoard/${displayBoard.id}/${id}`)
            .finally(() => {
              setUpdated(true);
              setNewBoardColumns(["Add A New Column"]);
              setDeleteColumnIdHolder([]);
            });
        });
      }
      setDidBoardNameChange(false);
    } catch (err) {
      console.log(err);
    }
  };
  return onSubmitHandler;
};

export default useCreateColumnSubmit;
