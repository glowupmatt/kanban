"use client";

import React from "react";
import { BoardDataType } from "@/types/boardData";
import { createContext, useState } from "react";

type AppContextType = {
  boardData: BoardDataType[];
  setBoardData: React.Dispatch<React.SetStateAction<BoardDataType[]>>;
  selectedBoardId: string;
  setSelectedBoardId: React.Dispatch<React.SetStateAction<string>>;
  updated: boolean;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  displayBoard: BoardDataType[];
  setDisplayBoard: React.Dispatch<React.SetStateAction<BoardDataType[]>>;
  boardOpen: boolean;
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DataContext = createContext({} as AppContextType);

type Props = {
  children: React.ReactNode;
};

export default function AppContext({ children }: Props) {
  const [boardData, setBoardData] = useState<BoardDataType[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<string>("");
  const [boardOpen, setBoardOpen] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(true);
  const [displayBoard, setDisplayBoard] = useState<BoardDataType[]>([
    {
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
        },
      ],
    },
  ]);
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
          setDisplayBoard,
          boardOpen,
          setBoardOpen,
        } as AppContextType
      }
    >
      {children}
    </DataContext.Provider>
  );
}
