import React from "react";
import { Input } from "../../ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "../../ui/button";

type Props = {
  newBoardColumns: string[];
  setNewBoardColumns: React.Dispatch<React.SetStateAction<string[]>>;
};

const NoCurrentColumns = (props: Props) => {
  const { newBoardColumns, setNewBoardColumns } = props;

  // Change Handler for the newBoardColumns state
  const columnOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setNewBoardColumns((prev) => {
      const newBoardColumns = [...prev];
      newBoardColumns[index] = value;
      return newBoardColumns;
    });
  };

  // Adds a new column to the form
  const addColumnHandler = () => {
    setNewBoardColumns((prev) => [...prev, `New Column`]);
  };

  // Removes a column from the form
  const removeColumnHandler = (index: number) => {
    setNewBoardColumns((prev) => [...prev.filter((_, i) => i !== index)]);
  };

  return (
    <div className="flex flex-col gap-2">
      {newBoardColumns.map((board, index) => (
        <div className="flex items-center gap-3" key={index}>
          <Input
            placeholder="Column Name"
            id="newBoardColumns"
            value={board}
            type="text"
            onChange={(e) => columnOnChangeHandler(e, index)}
          />
          <div onClick={() => removeColumnHandler(index)}>
            <CloseIcon className="text-grey-medium" />
          </div>
        </div>
      ))}
      <div
        onClick={addColumnHandler}
        className="flex text-purple-main w-full dark:bg-white bg-grey-light rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 h-[2.5rem]"
      >
        <p>+ Add New Column</p>
      </div>
    </div>
  );
};

export default NoCurrentColumns;
