import React from "react";
import { Input } from "../../ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "../../ui/button";
import axios from "axios";

type Props = {
  boardColumns: string[];
  setBoardColumns: React.Dispatch<React.SetStateAction<string[]>>;
  columns: any;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBoardId: any;
  oldBoardColumns: string[];
  setOldBoardColumns: React.Dispatch<React.SetStateAction<any[]>>;
};

const HasColumns = (props: Props) => {
  const {
    boardColumns,
    setBoardColumns,
    columns,
    setUpdated,
    selectedBoardId,
    oldBoardColumns,
    setOldBoardColumns,
  } = props;

  const addColumnHandler = () => {
    setBoardColumns((prev) => [...prev, ""]);
  };

  const columnOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setBoardColumns((prev) => {
      const newBoardColumns = prev;
      newBoardColumns[index] = value;
      return newBoardColumns;
    });
  };

  const oldColumnOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setOldBoardColumns((prev) => {
      const newBoardColumns = prev;
      newBoardColumns[index] = value;
      console.log(newBoardColumns);
      return newBoardColumns;
    });
  };

  const removeColumnHandler = (index: number) => {
    setBoardColumns((prev) => [...prev.filter((_, i) => i !== index)]);
  };

  const removerColumnFromApiHandler = async (
    boardId: string,
    columnId: string
  ) => {
    try {
      const res = await axios
        .delete(`/api/createBoard/${boardId}/${columnId}`)
        .then((res) => res)
        .finally(() => setUpdated(true));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <label htmlFor="boardColumns" className="text-start w-full">
        Board Columns
      </label>
      {columns.map((column: any, index: number) => {
        const { title, id } = column;
        // const columnOnChangeHandler = (
        //   event: React.ChangeEvent<HTMLInputElement>,
        //   id: string
        // ) => {
        //   const { value } = event.target;
        //   const data = {
        //     title: value,
        //   };

        //   console.log(data, "data");
        //   axios
        //     .put(`/api/createBoard/${selectedBoardId}/${id}`, data)
        //     .then((res) => res)
        //     .finally(() => setUpdated(true));
        // };
        return (
          <div className="flex items-center gap-3 w-full" key={index}>
            <Input
              id="boardColumns"
              type="text"
              onChange={(e) => oldColumnOnChangeHandler(e, index)}
              placeholder={title}
            />

            <div
              onClick={() => removerColumnFromApiHandler(selectedBoardId, id)}
            >
              <CloseIcon className="text-grey-medium" />
            </div>
          </div>
        );
      })}
      {boardColumns.map((title, index) => (
        <div className="flex items-center gap-3 w-full" key={index}>
          <Input
            placeholder="Add A New Column"
            id="boardColumns"
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

export default HasColumns;
