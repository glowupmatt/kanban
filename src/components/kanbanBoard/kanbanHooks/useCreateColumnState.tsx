"use client";

import { useState } from "react";
import { ColumnsType } from "@/types/columnsType";

const useCreateColumnState = (title: string, columns?: ColumnsType[]) => {
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

  return {
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
  };
};

export default useCreateColumnState;
