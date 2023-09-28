"use client";
import React from "react";
import { Button } from "../ui/button";
import AddIcon from "@mui/icons-material/Add";
import CreateColumn from "./CreateColumn";
import TodoList from "./columnDisplay/TodoList";
import CreateBoard from "./CreateBoard";

type Props = {
  selectedBoard: any;
};

const ColumnList = (props: Props) => {
  const { selectedBoard } = props;
  const { columns } = selectedBoard;

  if (!selectedBoard["columns"]) {
    return (
      <div className="h-screen flex  justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-[2.5rem]">
          <h2 className="text-grey-medium text-center max-w-[21.4375rem ]">
            There is no board selected. Create a new board to get started.
          </h2>
          <div className="bg-purple-main flex justify-center gap-1 items-center text-grey-lighter text-white w-full max-w-[10.875rem] h-full max-h-[3rem] rounded-full p-4">
            <AddIcon sx={{ color: "white" }} />
            <CreateBoard />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full">
        {selectedBoard && columns?.length <= 0 ? (
          <div className="flex flex-col justify-center items-center gap-[2.5rem]">
            <h2 className="text-grey-medium text-center max-w-[21.4375rem ]">
              There is no board selected. Create a new board to get started.
            </h2>
            <div className="bg-purple-main flex justify-center gap-1 items-center text-grey-lighter text-white w-full max-w-[10.875rem] h-full max-h-[3rem] rounded-full p-4">
              <AddIcon sx={{ color: "white" }} />
              <CreateColumn selectedBoard={selectedBoard} />
            </div>
          </div>
        ) : (
          <div className="h-full flex">
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
