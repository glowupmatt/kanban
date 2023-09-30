"use client";
import React from "react";
import { Button } from "../ui/button";
import AddIcon from "@mui/icons-material/Add";
import CreateColumn from "./CreateColumn";
import TodoList from "./columnDisplay/TodoList";
import CreateBoard from "./CreateBoard";

type Props = {
  selectedBoardId: any;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  boardData: any;
  displayBoard: any;
};

const ColumnList = (props: Props) => {
  const { selectedBoardId, setUpdated, boardData, displayBoard } = props;

  let columns;
  if (selectedBoardId === "") {
    columns = [];
  } else {
    columns = displayBoard[0]?.columns;
  }

  if (selectedBoardId === "" || !selectedBoardId) {
    //Check if there is no selectedBoardId display this a createBoard component
    return (
      <div className="h-screen flex  justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-[2.5rem]">
          <h2 className="text-grey-medium text-center max-w-[21.4375rem ]">
            There is no board selected. Create a new board to get started.
          </h2>
          <div className="bg-purple-main flex justify-center gap-1 items-center text-grey-lighter text-white w-full max-w-[10.875rem] h-full max-h-[3rem] rounded-full p-4">
            <AddIcon sx={{ color: "white" }} />
            <CreateBoard setUpdated={setUpdated} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full">
        {/* If there are no columns, display this component that displays add column*/}
        {(selectedBoardId === "" && columns.length <= 0) ||
        columns.length <= 0 ? (
          <div className="flex flex-col justify-center items-center gap-[2.5rem] h-full">
            <h2 className="text-grey-medium text-center max-w-[21.4375rem ]">
              There are no Columns. Create a new column to get started.
            </h2>
            <div className="bg-purple-main flex justify-center gap-1 items-center text-grey-lighter text-white w-full max-w-[10.875rem] h-full max-h-[3rem] rounded-full p-4">
              <AddIcon sx={{ color: "white" }} />
              <CreateColumn
                boardData={boardData}
                selectedBoardId={selectedBoardId}
                setUpdated={setUpdated}
                displayBoard={displayBoard}
              />
            </div>
          </div>
        ) : (
          <div className="h-full flex">
            {/* If there are columns, display this component that displays columns and all its Tasks*/}
            {columns?.map((column: any, index: number) => {
              const { title, id } = column;
              return <TodoList key={id} column={column} />;
            })}
          </div>
        )}
      </div>
    );
  }
};

export default ColumnList;
