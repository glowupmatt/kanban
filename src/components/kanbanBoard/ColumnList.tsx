"use client";
import React, { useContext } from "react";
import { ColumnsType } from "@/types/columnsType";
import NoColumnsDisplay from "./columnDisplay/NoColumnsDisplay";
import ContainsColumnsDisplay from "./columnDisplay/ContainsColumnsDisplay";
import { DataContext } from "@/context/AppContext";

type Props = {};

const ColumnList = (props: Props) => {
  const { displayBoard, selectedBoardId, setUpdated } = useContext(DataContext);

  let columns: ColumnsType[] = [];
  if (selectedBoardId === "") {
    columns = [];
  } else {
    columns = displayBoard[0]?.columns;
  }
  return (
    <div className="w-full h-full">
      {selectedBoardId === "" ||
      !selectedBoardId ||
      Object.keys(selectedBoardId).length <= 0 ? (
        //Check if there is no selectedBoardId. This will display a createBoard component
        <NoColumnsDisplay />
      ) : (
        <ContainsColumnsDisplay columns={columns} />
      )}
    </div>
  );
};

export default ColumnList;
