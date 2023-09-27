"use client";
import React from "react";
import { Button } from "../ui/button";
import AddIcon from "@mui/icons-material/Add";
import Add from "@mui/icons-material/Add";
import CreateColumn from "./CreateColumn";

type Props = {};

const ColumnList = (props: Props) => {
  const columns: string[] = [];

  return (
    <div className="">
      {columns.length <= 0 ? (
        <div className="flex flex-col justify-center items-center gap-[2.5rem]">
          <h2 className="text-grey-medium text-center max-w-[21.4375rem ]">
            This board is empty. Create a new column to get started.
          </h2>
          <div className="bg-purple-main flex justify-center gap-1 items-center text-grey-lighter text-white w-full max-w-[10.875rem] h-full max-h-[3rem] rounded-full p-4">
            <AddIcon sx={{ color: "white" }} />
            <CreateColumn />
          </div>
        </div>
      ) : (
        <div>
          {columns?.map((column, index) => (
            <div key={index}>
              <h2>{column}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColumnList;
