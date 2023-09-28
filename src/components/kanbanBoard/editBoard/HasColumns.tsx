import React from "react";
import { Input } from "../../ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "../../ui/button";

type Props = {
  boardColumns: string[];
  setBoardColumns: React.Dispatch<React.SetStateAction<string[]>>;
  columns: any;
};

const HasColumns = (props: Props) => {
  const { boardColumns, setBoardColumns, columns } = props;
  const addColumnHandler = () => {
    setBoardColumns((prev) => [...prev, `New Column`]);
  };

  const columnOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setBoardColumns((prev) => {
      const newBoardColumns = [...prev];
      newBoardColumns[index] = value;
      return newBoardColumns;
    });
  };

  const removeColumnHandler = (index: number) => {
    setBoardColumns((prev) => [...prev.filter((_, i) => i !== index)]);
  };
  return (
    <div>
      <label htmlFor="boardColumns">Board Columns</label>
      {boardColumns.map((title, index) => (
        <div className="flex items-center gap-3" key={index}>
          <Input
            placeholder="Column Name"
            id="boardColumns"
            type="text"
            value={title}
            onChange={(e) => columnOnChangeHandler(e, index)}
          />
          <div onClick={() => removeColumnHandler(index)}>
            <CloseIcon className="text-grey-medium" />
          </div>
        </div>
      ))}
      {columns.map((column: any, index: number) => {
        const { title, id } = column;
        return (
          <div className="flex items-center gap-3" key={index}>
            <Input
              placeholder="Column Name"
              id="boardColumns"
              type="text"
              onChange={(e) => columnOnChangeHandler(e, index)}
            />
            <div>
              <CloseIcon className="text-grey-medium" />
            </div>
          </div>
        );
      })}
      <div
        onClick={addColumnHandler}
        className="flex text-purple-main w-full dark:bg-white bg-grey-light rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 h-[2.5rem]"
      >
        <p>+ Add New Column</p>
      </div>
    </div>
  );
};

export default HasColumns;
