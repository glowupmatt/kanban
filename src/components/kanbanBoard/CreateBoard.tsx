"use client";
import React, { useState, useContext, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@mui/material";
import axios from "axios";
import { DataContext } from "@/context/AppContext";
import NewColumnInput from "./editBoard/NewColumnInput";
import BoardSubmitButton from "./editBoard/BoardSubmitButton";
import BoardTitleInput from "./editBoard/BoardTitleInput";

type Props = {};

const CreateBoard = (props: Props) => {
  const { setUpdated } = useContext(DataContext);
  const [newBoardColumns, setNewBoardColumns] = useState([""]);
  const [boardName, setBoardName] = useState("New Board");
  const [isFormValid, setIsFormValid] = useState(false);
  const [didBoardNameChange, setDidBoardNameChange] = useState<boolean>(false);

  useEffect(() => {
    if (
      boardName.length &&
      newBoardColumns.length &&
      newBoardColumns.every((column) => column.length)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [newBoardColumns, boardName]);

  const addColumnHandler = () => {
    setNewBoardColumns((prev) => [...prev, `New Column`]);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
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
        .finally(() => {
          setUpdated(true);
          setNewBoardColumns([""]);
          setBoardName("");
        });
    }
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
          <BoardTitleInput
            boardName={boardName}
            setBoardName={setBoardName}
            setDidBoardNameChange={setDidBoardNameChange}
          />
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="newBoardColumns"
                className="text-[0.75rem] font-[700]"
              >
                Board Columns
              </label>
              {newBoardColumns.map((board, index) => (
                <NewColumnInput
                  key={index}
                  board={board}
                  index={index}
                  setNewBoardColumns={setNewBoardColumns}
                />
              ))}
            </div>
            <Button
              onClick={addColumnHandler}
              className="flex text-purple-main w-full dark:bg-white bg-grey-light rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1"
            >
              <p className="font-[700]">+ Add New Column</p>
            </Button>
          </div>
          <BoardSubmitButton
            newBoardColumns={newBoardColumns}
            isFormValid={isFormValid}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoard;
