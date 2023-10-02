"use client";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateColumn from "./CreateColumn";
import TodoList from "./columnDisplay/TodoList";
import CreateBoard from "./CreateBoard";
import { BoardDataType } from "@/types/boardData";
import { ColumnsType } from "@/types/columnsType";
import NoColumnsDisplay from "./columnDisplay/NoColumnsDisplay";
import ContainsColumnsDisplay from "./columnDisplay/ContainsColumnsDisplay";

type Props = {
  selectedBoardId: string;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  boardData: BoardDataType[];
  displayBoard: BoardDataType[];
};

const ColumnList = (props: Props) => {
  const { selectedBoardId, setUpdated, boardData, displayBoard } = props;

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
        //Check if there is no selectedBoardId display this a createBoard component
        <NoColumnsDisplay setUpdated={setUpdated} />
      ) : (
        <ContainsColumnsDisplay
          boardData={boardData}
          selectedBoardId={selectedBoardId}
          columns={columns}
          setUpdated={setUpdated}
          displayBoard={displayBoard}
        />
      )}
    </div>
  );
};

export default ColumnList;
