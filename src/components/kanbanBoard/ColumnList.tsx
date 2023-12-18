"use client";
import React, { useContext } from "react";
import NoColumnsDisplay from "./columnDisplay/NoColumnsDisplay";
import ContainsColumnsDisplay from "./columnDisplay/ContainsColumnsDisplay";
import { DataContext } from "@/context/AppContext";

type Props = {};

const ColumnList = (props: Props) => {
  const { displayBoard } = useContext(DataContext);

  return (
    <div className="w-full h-full">
      {displayBoard?.id === "" ? (
        <NoColumnsDisplay />
      ) : (
        <ContainsColumnsDisplay />
      )}
    </div>
  );
};

export default ColumnList;
