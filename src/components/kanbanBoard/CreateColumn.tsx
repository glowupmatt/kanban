"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import NoCurrentColumns from "./editBoard/NoCurrentColumns";
import HasColumns from "./editBoard/HasColumns";
import { ColumnsType } from "@/types/columnsType";
import { DataContext } from "@/context/AppContext";
import BoardTitleInput from "./editBoard/BoardTitleInput";
import EditColumnSubmitButton from "./columnDisplay/EditColumnSubmitButton";

type Props = {};

const CreateColumn = (props: Props) => {
  const { displayBoard, setUpdated } = useContext(DataContext);

  const title = displayBoard?.title;
  const columns = displayBoard?.columns;
  const id = displayBoard?.id;
  const [boardName, setBoardName] = useState<string>(title);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [oldBoardColumns, setOldBoardColumns] = useState<string[]>(() => {
    if (columns) {
      return columns.map((column: ColumnsType) => column.title);
    } else {
      return [];
    }
  });
  const [localUpdatedState, setLocalUpdatedState] = useState<boolean>(false);
  const [didBoardNameChange, setDidBoardNameChange] = useState<boolean>(false);
  const [newBoardColumns, setNewBoardColumns] = useState(["Add A New Column"]);
  const [deleteColumnIdHolder, setDeleteColumnIdHolder] = useState<string[]>(
    []
  );
  useEffect(() => {
    if (
      (boardName.length &&
        newBoardColumns.length &&
        deleteColumnIdHolder.length) ||
      (didBoardNameChange &&
        boardName.length &&
        deleteColumnIdHolder.length &&
        !newBoardColumns.length) ||
      (newBoardColumns.every((column) => column.length) && boardName.length > 0)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    newBoardColumns,
    boardName,
    didBoardNameChange,
    deleteColumnIdHolder,
    oldBoardColumns,
  ]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (localUpdatedState === true && oldBoardColumns.length > 0) {
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
      if (newBoardColumns.length > 0 || boardName !== title) {
        const data = {
          title: boardName === "" ? title : boardName,
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
              setDeleteColumnIdHolder([]);
            });
        };
        deleteColumnIdHolder.map((id: string) => {
          deleteFunction(displayBoard.id, id);
        });
      }
      setDidBoardNameChange(false);
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
          {!columns.length ? (
            <div className="w-full flex flex-col gap-3">
              <BoardTitleInput
                boardName={boardName}
                setBoardName={setBoardName}
                setDidBoardNameChange={setDidBoardNameChange}
              />
              <p className="text-[0.75rem] font-[700]">Board Columns</p>
              <NoCurrentColumns
                newBoardColumns={newBoardColumns}
                setNewBoardColumns={setNewBoardColumns}
              />

              <EditColumnSubmitButton
                newBoardColumns={newBoardColumns}
                oldBoardColumns={oldBoardColumns}
                isFormValid={isFormValid}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-3">
              <div className="w-full">
                <BoardTitleInput
                  boardName={boardName}
                  setBoardName={setBoardName}
                  setDidBoardNameChange={setDidBoardNameChange}
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
              <EditColumnSubmitButton
                newBoardColumns={newBoardColumns}
                oldBoardColumns={oldBoardColumns}
                isFormValid={isFormValid}
              />
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateColumn;
