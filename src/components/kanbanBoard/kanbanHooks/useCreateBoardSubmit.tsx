"use client";
import React, { useContext } from "react";
import axios from "axios";
import { DataContext } from "@/context/AppContext";

const useCreateBoardSubmit = (
  setNewBoardColumns: React.Dispatch<React.SetStateAction<string[]>>,
  setBoardName: React.Dispatch<React.SetStateAction<string>>,
  isFormValid: boolean,
  newBoardColumns: string[]
) => {
  const { setUpdated } = useContext(DataContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      const data = {
        title: e.currentTarget.boardName.value,
        columns: newBoardColumns.map((title) => title),
      };
      try {
        const res = await axios.post("/api/createBoard", {
          ...data,
          ...data.columns,
        });
        setUpdated(true);
        setNewBoardColumns([""]);
        setBoardName("");
        return res;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return handleSubmit;
};
export default useCreateBoardSubmit;
