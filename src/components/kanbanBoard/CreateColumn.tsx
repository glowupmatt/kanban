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
  selectedBoardId: any;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  boardData: any;
  displayBoard: any;
};

const CreateColumn = (props: Props) => {
  const { selectedBoardId, setUpdated, boardData, displayBoard } = props;
  const { title, columns, id } = displayBoard[0];
  const [boardTitle, setBoardTitle] = useState(`${title}`);
  const [oldBoardColumns, setOldBoardColumns] = useState([
    ...columns.map((column: any) => {
      return column.title;
    }),
  ]);
  const [boardColumns, setBoardColumns] = useState(["Add A New Column"]);

  const boardNameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.currentTarget.value);
  };

  console.log(oldBoardColumns, "oldBoardColumns");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = columns.map((column: any, index: number) => {
        const editOldColumns = async () => {
          const data = {
            title: oldBoardColumns[index],
          };

          console.log(title, "columnTitle");
          const res = await axios
            .put(`/api/createBoard/${id}/${column.id}`, { ...data })
            .then((res) => res)
            .finally(() => setUpdated(true));
          console.log(res, "res2");
        };
        editOldColumns();
      });
      if (boardColumns.length > 0) {
        const data = {
          title: boardTitle === "" ? title : boardTitle,
          columns: boardColumns.map((title) => title),
        };
        const res = await axios
          .put(`/api/createBoard/${id}`, {
            ...data,
            ...data.columns,
          })
          .then((res) => res)
          .finally(() => setUpdated(true));
      }
    } catch (err) {
      console.log(err);
    }
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
                    id="boardName"
                    placeholder={boardTitle}
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
                <div>
                  <label htmlFor="boardName">Board Name</label>
                  <Input
                    id="boardName"
                    value={boardTitle}
                    type="text"
                    onChange={boardNameOnChangeHandler}
                  />
                </div>
                <HasColumns
                  boardColumns={boardColumns}
                  setBoardColumns={setBoardColumns}
                  columns={columns}
                  setUpdated={setUpdated}
                  selectedBoardId={selectedBoardId}
                  oldBoardColumns={oldBoardColumns}
                  setOldBoardColumns={setOldBoardColumns}
                />
                <Button
                  type="submit"
                  className="flex text-white bg-purple-main rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 self-center w-full"
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
