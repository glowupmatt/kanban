import React from "react";
import { ColumnsType } from "@/types/columnsType";
import ColumnInput from "../columnDisplay/ColumnInput";
import NewColumnInput from "./NewColumnInput";

type Props = {
  newBoardColumns: string[];
  setNewBoardColumns: React.Dispatch<React.SetStateAction<string[]>>;
  columns: ColumnsType[];
  setOldBoardColumns: React.Dispatch<React.SetStateAction<string[]>>;
  setDeleteColumnIdHolder: React.Dispatch<React.SetStateAction<string[]>>;
  deleteColumnIdHolder: string[];
  localUpdatedState: boolean;
  setLocalUpdatedState: React.Dispatch<React.SetStateAction<boolean>>;
};

const HasColumns = (props: Props) => {
  const {
    newBoardColumns,
    setNewBoardColumns,
    columns,
    setOldBoardColumns,
    setDeleteColumnIdHolder,
    deleteColumnIdHolder,
    setLocalUpdatedState,
    localUpdatedState,
  } = props;

  // Adds new column to the form state
  const addColumnHandler = () => {
    setNewBoardColumns((prev) => [...prev, ""]);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <label htmlFor="newBoardColumns" className="text-start w-full">
        Board Columns
      </label>
      <div className="flex flex-col gap-2 w-full mb-2">
        {columns
          .filter((column: ColumnsType) => {
            return !deleteColumnIdHolder.includes(column.id);
          })
          .map((column: ColumnsType, index: number) => {
            const { title, id } = column;
            return (
              <div className="flex items-center gap-3 w-full" key={index}>
                <ColumnInput
                  id={id}
                  setOldBoardColumns={setOldBoardColumns}
                  setLocalUpdatedState={setLocalUpdatedState}
                  setDeleteColumnIdHolder={setDeleteColumnIdHolder}
                  title={title}
                  index={index}
                />
              </div>
            );
          })}
      </div>

      {newBoardColumns.map((board, index: number) => {
        return (
          <div className="flex items-center gap-3 w-full" key={index}>
            <NewColumnInput
              index={index}
              setNewBoardColumns={setNewBoardColumns}
              board={board}
            />
          </div>
        );
      })}

      <div
        onClick={addColumnHandler}
        className="flex text-purple-main w-full dark:bg-white bg-grey-light rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 h-[2.5rem]"
      >
        <p className="font-[700]">+ Add New Column</p>
      </div>
    </div>
  );
};

export default HasColumns;
