"use client";
import React, { useContext } from "react";
import { ColumnsType } from "@/types/columnsType";
import NoColumnsDisplay from "./columnDisplay/NoColumnsDisplay";
import ContainsColumnsDisplay from "./columnDisplay/ContainsColumnsDisplay";
import { DataContext } from "@/context/AppContext";

type Props = {};

const ColumnList = (props: Props) => {
  const { displayBoard } = useContext(DataContext);

  return (
    <div className="w-full h-full">
      {displayBoard?.id === "" ||
      !displayBoard?.id ||
      displayBoard?.id.length <= 0 ? (
        //Check if there is no selectedBoardId. This will display a createBoard component
        <NoColumnsDisplay />
      ) : (
        <ContainsColumnsDisplay />
      )}
    </div>
  );
};

export default ColumnList;
