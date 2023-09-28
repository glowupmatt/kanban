"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import axios from "axios";
import { DialogClose } from "../ui/dialog";

type Props = {};

const CreateBoard = (props: Props) => {
  const [boardColumns, setBoardColumns] = useState(["New Column"]);
  const [boardName, setBoardName] = useState("New Board");

  const addColumnHandler = () => {
    setBoardColumns((prev) => [...prev, `New Column`]);
  };

  const removeColumnHandler = (index: number) => {
    setBoardColumns((prev) => [...prev.filter((_, i) => i !== index)]);
  };

  const boardNameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.currentTarget.value);
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

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: e.currentTarget.boardName.value,
      columns: boardColumns.map((title) => title),
    };
    console.log(data);
    const res = await axios
      .post("/api/createBoard", {
        ...data,
        ...data.columns,
      })
      .then((res) => res);
    console.log(res);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <h3>Create Board</h3>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-[1.5rem]" onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="boardName">Board Name</label>
            <Input
              placeholder="e.g. Web Design"
              id="boardName"
              type="text"
              value={boardName}
              onChange={boardNameOnChangeHandler}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="boardColumns">Board Columns</label>
            {boardColumns.map((board, index) => (
              <div className="flex items-center gap-3" key={index}>
                <Input
                  placeholder="Column Name"
                  id="boardColumns"
                  type="text"
                  value={board}
                  onChange={(e) => columnOnChangeHandler(e, index)}
                />
                <button onClick={() => removeColumnHandler(index)}>
                  <CloseIcon className="text-grey-medium" />
                </button>
              </div>
            ))}
            <Button
              onClick={addColumnHandler}
              className="flex text-purple-main w-full dark:bg-white bg-grey-light rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1"
            >
              <p>+ Add New Column</p>
            </Button>
          </div>
          <Button
            type="submit"
            className="flex text-white bg-purple-main rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1"
          >
            <DialogClose>
              <p>Create New Board</p>
            </DialogClose>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoard;
