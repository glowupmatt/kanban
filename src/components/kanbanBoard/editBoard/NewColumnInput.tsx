"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { isStringEmpty } from "@/lib/inputChecker";
import classNames from "classnames";

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
    <div className="flex items-center gap-3 mb-3 w-full">
      <div className="relative w-full flex justify-end items-end" key={index}>
        <Input
          placeholder="Column Name"
          id="newBoardColumns"
          type="text"
          value={board}
          onChange={(e) => columnOnChangeHandler(e, index)}
          className={classNames(
            "border-solid border-2",
            { "border-red-main absolute": isStringEmpty(board) },
            {
              "dark:border-grey-light border-grey-darkest":
                isStringEmpty(board) === false,
            }
          )}
        />
        <p
          className={classNames(
            "text-end p-2 text-[0.8125rem] text-red-main",
            //prettier-ignore
            { "hidden": isStringEmpty(board) === false }
          )}
        >
          Cant be empty!
        </p>
      </div>
      <button onClick={() => removeColumnHandler(index)}>
        <CloseIcon className="text-grey-medium" />
      </button>
    </div>
  );
};

export default NewColumnInput;
