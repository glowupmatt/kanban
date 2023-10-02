"use client";
import React from "react";
import { Input } from "../ui/input";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  board: string;
  index: number;
  setNewBoardColumns: React.Dispatch<React.SetStateAction<string[]>>;
};

const NewColumnInput = (props: Props) => {
  const { board, index, setNewBoardColumns } = props;

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

  const removeColumnHandler = (index: number) => {
    setNewBoardColumns((prev) => [...prev.filter((_, i) => i !== index)]);
  };
  return (
    <div className="flex items-center gap-3 mb-3" key={index}>
      <Input
        placeholder="Column Name"
        id="newBoardColumns"
        type="text"
        value={board}
        onChange={(e) => columnOnChangeHandler(e, index)}
        className="dark:border-grey-light border-grey-darkest border-solid border-2"
      />
      <button onClick={() => removeColumnHandler(index)}>
        <CloseIcon className="text-grey-medium" />
      </button>
    </div>
  );
};

export default NewColumnInput;
