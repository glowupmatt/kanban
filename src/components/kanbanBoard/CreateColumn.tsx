"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import NoCurrentColumns from "./editBoard/NoCurrentColumns";
import HasColumns from "./editBoard/HasColumns";
import { ColumnsType } from "@/types/columnsType";
import { DataContext } from "@/context/AppContext";

type Props = {};

const CreateColumn = (props: Props) => {
  const { displayBoard, selectedBoardId, setUpdated } = useContext(DataContext);
  // selected board data that is displayed for user
  const title = displayBoard[0]?.title;
  const columns = displayBoard[0]?.columns;
  const id = displayBoard[0]?.id;

  const [boardTitle, setBoardTitle] = useState<string>(title);
  useEffect(() => {
    setBoardTitle(title);
  }, [setBoardTitle, title]);
  console.log(boardTitle, "TITLE");
  // Map through all the columns and set the title to the oldBoardColumns state
  const [oldBoardColumns, setOldBoardColumns] = useState<string[]>(() => {
    if (columns) {
      return columns.map((column: ColumnsType) => column.title);
    } else {
      return [];
    }
  });
  const [localUpdatedState, setLocalUpdatedState] = useState<boolean>(false);

  // Set the new columns to the newBoardColumns state
  const [newBoardColumns, setNewBoardColumns] = useState(["Add A New Column"]);
  // Stores the selected column id to be deleted
  const [deleteColumnIdHolder, setDeleteColumnIdHolder] = useState<string[]>(
    []
  );
  //changed the title of the board
  const boardNameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.currentTarget.value);
  };
  //on submit handler for the edit board modal
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (localUpdatedState === true) {
        const res = columns.map((column: any, index: number) => {
          const editOldColumns = async () => {
            const data = {
              title: oldBoardColumns[index],
            };
            const res = await axios
              .put(`/api/createBoard/${id}/${column.id}`, { ...data })
              .then((res) => res)
              .finally(() => setUpdated(true));
          };
          editOldColumns();
        });
      }
      if (newBoardColumns.length > 0 || boardTitle !== title) {
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
            .finally(() => {
              setUpdated(true), setNewBoardColumns(["Add A New Column"]);
            });
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
      <DialogTrigger className="h-full w-full">
        <h3>Add Columns</h3>
      </DialogTrigger>
      <DialogContent className="dark:bg-grey-darkest p-4 rounded-md max-w-[21.4375rem] overflow-scroll max-h-full">
        <DialogHeader>
          <DialogTitle className="text-start">Edit Board</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 w-full items-center"
          onSubmit={onSubmitHandler}
        >
          {/* check for column if none it will display create column button */}
          {!columns ? (
            <div>
              <div>
                <label
                  htmlFor="boardName"
                  className="text-[0.75rem] font-[700]"
                >
                  Board Name
                </label>
                <Input
                  id="boardName"
                  placeholder={boardTitle}
                  type="text"
                  value={boardTitle}
                  onChange={boardNameOnChangeHandler}
                  className="dark:border-grey-light border-grey-darkest border-solid border-2"
                />
                <p className="font-[700]">Board Columns</p>
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
                  <p className="font-[700]">Save Changes</p>
                </DialogClose>
              </Button>

              {/* check for column if none it will display create column button */}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="w-full">
                <label htmlFor="boardName">Board Name</label>
                <Input
                  id="boardName"
                  value={boardTitle}
                  placeholder={boardTitle}
                  type="text"
                  onChange={boardNameOnChangeHandler}
                  className="dark:border-grey-light border-grey-darkest border-solid border-2"
                />
              </div>
              <HasColumns
                newBoardColumns={newBoardColumns}
                setNewBoardColumns={setNewBoardColumns}
                columns={columns}
                setOldBoardColumns={setOldBoardColumns}
                deleteColumnIdHolder={deleteColumnIdHolder}
                setDeleteColumnIdHolder={setDeleteColumnIdHolder}
                localUpdatedState={localUpdatedState}
                setLocalUpdatedState={setLocalUpdatedState}
              />
              <Button
                type="submit"
                className="flex text-white bg-purple-main rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 self-center w-full mt-[1rem]"
              >
                <DialogClose>
                  <p className="font-[700]">Save Changes</p>
                </DialogClose>
              </Button>

              {/* check for column if there are columns it will display all the columns that can be edited*/}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateColumn;
