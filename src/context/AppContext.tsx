"use client";

import React from "react";
import { BoardDataType } from "@/types/boardData";
import { SelectedColumnsType } from "@/types/selectedBoardData";
import { createContext, useState } from "react";

type AppContextType = {
  boardData: BoardDataType[];
  setBoardData: React.Dispatch<React.SetStateAction<BoardDataType[]>>;
  selectedBoard: SelectedColumnsType;
  setSelectedBoard: React.Dispatch<React.SetStateAction<SelectedColumnsType>>;
  updated: boolean;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  displayBoard: SelectedColumnsType[];
  setDisplayBoard: React.Dispatch<React.SetStateAction<SelectedColumnsType[]>>;
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
  const [selectedBoard, setSelectedBoard] = useState<SelectedColumnsType>({
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
            userId: "",
            boardId: "",
            columnId: "",
            createdAt: "",
            updatedAt: "",
            subTask: [{ title: "" }],
          },
        ],
      },
    ],
  });
  const [displayBoard, setDisplayBoard] = useState<SelectedColumnsType[]>([
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
          tasks: [
            {
              id: "",
              title: "",
              description: "",
              userId: "",
              boardId: "",
              columnId: "",
              createdAt: "",
              updatedAt: "",
              subTask: [{ title: "" }],
            },
          ],
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
          selectedBoard,
          setSelectedBoard,
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
