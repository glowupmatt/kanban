"use client";
import React, { useContext } from "react";
import { ColumnsType } from "@/types/columnsType";
import NoColumnsDisplay from "./columnDisplay/NoColumnsDisplay";
import ContainsColumnsDisplay from "./columnDisplay/ContainsColumnsDisplay";
import { DataContext } from "@/context/AppContext";

type Props = {};

const ColumnList = (props: Props) => {
  const { selectedBoard } = useContext(DataContext);

  // let columns: ColumnsType[] = [];
  // if (selectedBoard?.id === "") {
  //   columns = [];
  // } else {
  //   columns = selectedBoard?.columns;
  // }
  return (
    <div className="w-full h-full">
      {selectedBoard.id === "" ||
      !selectedBoard.id ||
      selectedBoard.id.length <= 0 ? (
        //Check if there is no selectedBoardId. This will display a createBoard component
        <NoColumnsDisplay />
      ) : (
        <ContainsColumnsDisplay />
      )}
    </div>
  );
};

export default ColumnList;
