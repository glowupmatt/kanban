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
  // selected board data that is displayed for user
  const { title, columns, id } = displayBoard[0];
  const [boardTitle, setBoardTitle] = useState(`${title}`);
  // Map through all the columns and set the title to the oldnewBoardColumns state
  const [oldBoardColumns, setOldBoardColumns] = useState([
    ...columns.map((column: any) => {
      return column.title;
    }),
  ]);
  // Set the new columns to the newBoardColumns state
  const [newBoardColumns, setNewBoardColumns] = useState(["Add A New Column"]);
  // Stores the selected column id to be deleted
  const [deleteColumnIdHolder, setDeleteColumnIdHolder] = useState([] as any);
  //changed the title of the board
  const boardNameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.currentTarget.value);
  };
  //on submit handler for the edit board modal
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
      if (newBoardColumns.length > 0) {
        const data = {
          title: boardTitle === "" ? title : boardTitle,
          columns: newBoardColumns.map((title) => title),
        };
        const res = await axios
          .put(`/api/createBoard/${id}`, {
            ...data,
            ...data.columns,
          })
          .then((res) => res)
          .finally(() => setUpdated(true));
      }
      if (deleteColumnIdHolder.length > 0) {
        const deleteFunction = async (boardId: string, columnId: string) => {
          const res = await axios
            .delete(`/api/createBoard/${boardId}/${columnId}`)
            .then((res) => res)
            .finally(() => setUpdated(true));
          console.log(res);
        };
        deleteColumnIdHolder.map((id: string) => {
          deleteFunction(selectedBoardId, id);
        });
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
          {/* check for column if none it will display create column button */}
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
                    newBoardColumns={newBoardColumns}
                    setNewBoardColumns={setNewBoardColumns}
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
              {/* check for column if none it will display create column button */}
            </div>
          ) : (
            <div>
              {/* check for column if there are columns it will display all the columns that can be edited*/}
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
                  newBoardColumns={newBoardColumns}
                  setNewBoardColumns={setNewBoardColumns}
                  columns={columns}
                  setOldBoardColumns={setOldBoardColumns}
                  deleteColumnIdHolder={deleteColumnIdHolder}
                  setDeleteColumnIdHolder={setDeleteColumnIdHolder}
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
              {/* check for column if there are columns it will display all the columns that can be edited*/}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateColumn;
