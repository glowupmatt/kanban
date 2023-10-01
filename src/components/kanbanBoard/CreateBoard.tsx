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

type Props = {
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBoard = (props: Props) => {
  const { setUpdated } = props;
  const [newBoardColumns, setNewBoardColumns] = useState(["New Column"]);
  const [boardName, setBoardName] = useState("New Board");

  const addColumnHandler = () => {
    setNewBoardColumns((prev) => [...prev, `New Column`]);
  };

  const removeColumnHandler = (index: number) => {
    setNewBoardColumns((prev) => [...prev.filter((_, i) => i !== index)]);
  };

  const boardNameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.currentTarget.value);
  };
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

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: e.currentTarget.boardName.value,
      columns: newBoardColumns.map((title) => title),
    };
    const res = await axios
      .post("/api/createBoard", {
        ...data,
        ...data.columns,
      })
      .then((res) => res)
      .finally(() => setUpdated(true));
  };
  return (
    <Dialog>
      <DialogTrigger>
        <h3>Create Board</h3>
      </DialogTrigger>
      <DialogContent className="dark:bg-grey-darkest p-4 rounded-md max-w-[21.4375rem] overflow-scroll max-h-full">
        <DialogHeader>
          <DialogTitle className="text-start">Add New Board</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-[1.5rem]" onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="boardName" className="text-[0.75rem] font-[700]">
              Board Name
            </label>
            <Input
              placeholder="e.g. Web Design"
              id="boardName"
              type="text"
              value={boardName}
              onChange={boardNameOnChangeHandler}
              className="dark:border-grey-light border-grey-darkest border-solid border-2"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="newBoardColumns"
                className="text-[0.75rem] font-[700]"
              >
                Board Columns
              </label>
              {newBoardColumns.map((board, index) => (
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
              ))}
            </div>
            <Button
              onClick={addColumnHandler}
              className="flex text-purple-main w-full dark:bg-white bg-grey-light rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1"
            >
              <p className="font-[700]">+ Add New Column</p>
            </Button>
          </div>
          <Button
            type="submit"
            className="flex text-white bg-purple-main rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1"
          >
            <DialogClose>
              <p className="font-[700]">Create New Board</p>
            </DialogClose>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoard;
