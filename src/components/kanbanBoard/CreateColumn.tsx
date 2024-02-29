"use client";
import React, { useContext, useEffect, useState } from "react";
import useCreateColumnSubmit from "./kanbanHooks/useCreateColumnSubmit";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCreateColumnState from "./kanbanHooks/useCreateColumnState";
import NoCurrentColumns from "./editBoard/NoCurrentColumns";
import HasColumns from "./editBoard/HasColumns";
import { DataContext } from "@/context/AppContext";
import BoardTitleInput from "./editBoard/BoardTitleInput";
import EditColumnSubmitButton from "./columnDisplay/EditColumnSubmitButton";

type Props = {};

const CreateColumn = (props: Props) => {
  const { displayBoard } = useContext(DataContext);

  const title = displayBoard?.title;
  const columns = displayBoard?.columns;
  const {
    boardName,
    setBoardName,
    isFormValid,
    setIsFormValid,
    oldBoardColumns,
    setOldBoardColumns,
    localUpdatedState,
    setLocalUpdatedState,
    didBoardNameChange,
    setDidBoardNameChange,
    newBoardColumns,
    setNewBoardColumns,
    deleteColumnIdHolder,
    setDeleteColumnIdHolder,
  } = useCreateColumnState(title, columns);

  const check =
    (boardName.length &&
      newBoardColumns.length &&
      deleteColumnIdHolder.length) ||
    (didBoardNameChange &&
      boardName.length &&
      deleteColumnIdHolder.length &&
      !newBoardColumns.length) ||
    (newBoardColumns.every((column) => column.length) && boardName.length > 0);

  useEffect(() => {
    if (check) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [check, setIsFormValid]);

  const boardTitleInput = (
    <BoardTitleInput
      boardName={boardName}
      setBoardName={setBoardName}
      setDidBoardNameChange={setDidBoardNameChange}
    />
  );

  const editColumnSubmitButton = (
    <EditColumnSubmitButton
      newBoardColumns={newBoardColumns}
      oldBoardColumns={oldBoardColumns}
      isFormValid={isFormValid}
    />
  );

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
          onSubmit={useCreateColumnSubmit(
            localUpdatedState,
            oldBoardColumns,
            columns,
            newBoardColumns,
            boardName,
            title,
            deleteColumnIdHolder,
            displayBoard,
            setDidBoardNameChange,
            setNewBoardColumns,
            setDeleteColumnIdHolder
          )}
        >
          <div className="w-full flex flex-col gap-3">
            {!columns.length ? (
              <>
                {boardTitleInput}
                <p className="text-[0.75rem] font-[700]">Board Columns</p>
                <NoCurrentColumns
                  newBoardColumns={newBoardColumns}
                  setNewBoardColumns={setNewBoardColumns}
                />
                {editColumnSubmitButton}
              </>
            ) : (
              <>
                <div className="w-full">{boardTitleInput}</div>
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
                {editColumnSubmitButton}
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateColumn;
