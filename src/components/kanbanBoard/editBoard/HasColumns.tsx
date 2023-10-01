import React from "react";
import { Input } from "../../ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { BoardDataType } from "@/types/boardData";
import { ColumnsType } from "@/types/columnsType";

type Props = {
  newBoardColumns: string[];
  setNewBoardColumns: React.Dispatch<React.SetStateAction<string[]>>;
  columns: ColumnsType[];
  setOldBoardColumns: React.Dispatch<React.SetStateAction<string[]>>;
  setDeleteColumnIdHolder: React.Dispatch<React.SetStateAction<string[]>>;
  deleteColumnIdHolder: string[];
  updated: boolean;
  setUpdatedState: React.Dispatch<React.SetStateAction<boolean>>;
};

const HasColumns = (props: Props) => {
  const {
    newBoardColumns,
    setNewBoardColumns,
    columns,
    setOldBoardColumns,
    setDeleteColumnIdHolder,
    deleteColumnIdHolder,
    updated,
    setUpdatedState,
  } = props;

  // Adds new column to the form state
  const addColumnHandler = () => {
    setNewBoardColumns((prev) => [...prev, ""]);
  };

  // Sets the new column title to the newBoardColumns state
  const columnOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setNewBoardColumns((prev) => {
      const newBoardColumns = prev;
      newBoardColumns[index] = value;
      return newBoardColumns;
    });
  };

  // Changes the old column title to a new title
  const oldColumnOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setOldBoardColumns((prev) => {
      const newBoardColumns = prev;
      newBoardColumns[index] = value;
      return newBoardColumns;
    });
    setUpdatedState(true);
  };

  // Removes a column from the form
  const removeColumnHandler = (index: number) => {
    setNewBoardColumns((prev) => [...prev.filter((_, i) => i !== index)]);
  };

  // Stores the selected column id to be deleted
  const onIdBufferHandler = (id: string) => {
    setDeleteColumnIdHolder((prev: string[]) => [...prev, id]);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <label htmlFor="newBoardColumns" className="text-start w-full">
        Board Columns
      </label>
      {/* Maps over all the columns and filters the columns that have their Ids stored in the deleteColumnIdHolder*/}
      {columns
        .filter((column: ColumnsType) => {
          return !deleteColumnIdHolder.includes(column.id);
        })
        .map((column: ColumnsType, index: number) => {
          const { title, id } = column;
          return (
            <div className="flex items-center gap-3 w-full" key={index}>
              <Input
                id="newBoardColumns"
                type="text"
                onChange={(e) => oldColumnOnChangeHandler(e, index)}
                placeholder={title}
                className="dark:border-grey-light border-grey-darkest border-solid border-2"
              />

              <div onClick={() => onIdBufferHandler(id)}>
                <CloseIcon className="text-grey-medium" />
              </div>
              {/* Maps over all the columns and filters the columns that have their Ids stored in the deleteColumnIdHolder*/}
            </div>
          );
        })}
      {newBoardColumns.map((_, index) => (
        <div className="flex items-center gap-3 w-full" key={index}>
          {/* Maps over all the new columns the user wants to add*/}
          <Input
            placeholder="Add A New Column"
            id="newBoardColumns"
            type="text"
            onChange={(e) => columnOnChangeHandler(e, index)}
            className="dark:border-grey-light border-grey-darkest border-solid border-2"
          />
          <div onClick={() => removeColumnHandler(index)}>
            <CloseIcon className="text-grey-medium" />
          </div>
          {/* Maps over all the new columns the user wants to add*/}
        </div>
      ))}
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
