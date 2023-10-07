"use client";

import React from "react";
import { BoardDataType } from "@/types/boardData";
import { createContext, useState } from "react";
import { TaskType, SubTaskType } from "@/types/taskType";

type AppContextType = {
  boardData: BoardDataType[];
  setBoardData: React.Dispatch<React.SetStateAction<BoardDataType[]>>;
  selectedBoardId: string;
  setSelectedBoardId: React.Dispatch<React.SetStateAction<string>>;
  updated: boolean;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  displayBoard: BoardDataType;
  boardOpen: boolean;
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DataContext = createContext({} as AppContextType);

type Props = {
  children: React.ReactNode;
};

export default function AppContext({ children }: Props) {
  const [boardData, setBoardData] = useState<BoardDataType[]>([]);
  const [boardOpen, setBoardOpen] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(true);
  const [selectedBoardId, setSelectedBoardId] = useState<string>("");
  let displayBoard: BoardDataType | undefined;
  if (selectedBoardId === "") {
    displayBoard = {
      id: "",
      title: "",
      createdAt: "",
      updatedAt: "",
      userId: "",
      columns: [
        {
          id: "",
          title: "",
          createdAt: "",
          UpdatedAt: "",
          userId: "",
          boardId: "",
          tasks: [
            {
              id: "",
              title: "",
              description: "",
              createdAt: "",
              updatedAt: "",
              userId: "",
              columnId: "",
              boardId: "",
              subTask: [
                {
                  id: "",
                  title: "",
                  completed: false,
                  createdAt: "",
                  updatedAt: "",
                  taskId: "",
                },
              ],
            },
          ],
        },
      ],
    };
  } else {
    displayBoard = boardData.find((board) => board.id === selectedBoardId);
  }

  return (
    <DataContext.Provider
      value={
        {
          boardData,
          setBoardData,
          selectedBoardId,
          setSelectedBoardId,
          updated,
          setUpdated,
          displayBoard,
          boardOpen,
          setBoardOpen,
        } as AppContextType
      }
    >
      {children}
    </DataContext.Provider>
  );
}
