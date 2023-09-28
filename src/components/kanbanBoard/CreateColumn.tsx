"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import NoCurrentColumns from "./editBoard/NoCurrentColumns";
import HasColumns from "./editBoard/HasColumns";

type Props = {
  selectedBoard: any;
};

const CreateColumn = (props: Props) => {
  const [boardColumns, setBoardColumns] = useState(["New Column"]);
  const [boardTitle, setBoardTitle] = useState("");
  const { selectedBoard } = props;
  const { columns, title, id } = selectedBoard;

  console.log(boardTitle, "BOARD TITLE");
  const boardNameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.currentTarget.value);
  };
  console.log(boardTitle);

  // console.log(boardColumns);
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: boardTitle,
      columns: boardColumns.map((title) => title),
    };
    console.log(data);
    const res = await axios
      .put(`/api/createBoard/${id}`, {
        ...data,
        ...data.columns,
      })
      .then((res) => res);
    console.log(res);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <h3>Add Columns</h3>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
        </DialogHeader>
        <div>
          {!columns ? (
            <div>
              <form
                className="flex flex-col gap-4 w-full"
                onSubmit={onSubmitHandler}
              >
                <div>
                  <label htmlFor="boardName">Board Name</label>
                  <Input
                    placeholder={title}
                    type="text"
                    value={boardTitle}
                    onChange={boardNameOnChangeHandler}
                  />
                  <p>Board Columns</p>
                  <NoCurrentColumns
                    boardColumns={boardColumns}
                    setBoardColumns={setBoardColumns}
                  />
                </div>
                <Button
                  type="submit"
                  className="flex text-white bg-purple-main rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1"
                >
                  <DialogClose>
                    <p>Save Changes</p>
                  </DialogClose>
                </Button>
              </form>
            </div>
          ) : (
            <div>
              <form
                className="flex flex-col gap-4 w-full"
                onSubmit={onSubmitHandler}
              >
                <HasColumns
                  boardColumns={boardColumns}
                  setBoardColumns={setBoardColumns}
                  columns={columns}
                />
                <Button
                  type="submit"
                  className="flex text-white bg-purple-main rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1"
                >
                  <DialogClose>
                    <p>Save Changes</p>
                  </DialogClose>
                </Button>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateColumn;
