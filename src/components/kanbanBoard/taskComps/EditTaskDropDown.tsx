"use client";
import React, { useContext, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classNames from "classnames";
import { deepPurple, grey } from "@mui/material/colors";
import { DataContext } from "@/context/AppContext";
import { set } from "react-hook-form";

type Props = {
  task: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    columnId: string;
    boardId: string;
    subTask: {
      id: string;
      title: string;
      completed: boolean;
      createdAt: string;
      updatedAt: string;
      taskId: string;
    }[];
  };
  setSelectedCurrentStatus: React.Dispatch<React.SetStateAction<string>>;
  selectedCurrentStatus: string;
};
const EditTaskDropDown = (props: Props) => {
  const { task, setSelectedCurrentStatus, selectedCurrentStatus } = props;
  const { displayBoard } = useContext(DataContext);
  const columns = displayBoard.columns;
  const selectedColumn = displayBoard.columns.filter(
    (column) => column.id === task.columnId
  );

  const [columnsOpen, setColumnsOpen] = useState(false);
  const [selectedColumnState, setSelectedColumnState] = useState("");

  const openColumns = () => {
    setColumnsOpen((prev) => !prev);
  };
  return (
    <div className="w-full z-[100] relative">
      <p className="text-[0.75rem] font-[700] text-start w-full">
        Current Status
      </p>
      <div
        onClick={openColumns}
        className={classNames(
          "w-full border-solid border-2 rounded-md h-[2.5rem] pl-4 flex justify-between items-center min-w-[18.4375rem] ",
          { "border-red-main": selectedColumnState === "" },
          {
            "dark:border-grey-light border-grey-darkest":
              selectedColumnState !== "",
          }
        )}
      >
        {selectedColumnState === "" ? (
          <label className="text-[0.75rem] font-[700]">Select Status</label>
        ) : (
          <p className="text-start">{selectedColumnState}</p>
        )}
        <div
          className={classNames(
            "flex justify-center items-center h-[5px] w-[5px] mr-4",
            {
              "rotate-180 transform transition duration-500 ease-in-out":
                columnsOpen,
            },
            {
              "rotate-0 transform transition duration-500 ease-in-out":
                !columnsOpen,
            }
          )}
        >
          <KeyboardArrowDownIcon sx={{ color: deepPurple[`A100`] }} />
        </div>
      </div>

      {/* prettier-ignore */}
      <div
    className={classNames(
      "min-w-[16.4375rem] min-h-[2rem] max-h-[10rem] overflow-scroll bg-grey-light dark:bg-black-dark p-4 mt-2",
      {
        "hidden": !columnsOpen,
      },
      {
        "flex flex-col gap-2": columnsOpen,
      }
    )}
  >
    {columns?.map((column, index) => {

       const closeColumnsSetState = () => {
        setSelectedColumnState(column.title)
        setSelectedCurrentStatus(column.id)
        setColumnsOpen((prev) => !prev);
    };
      
      return (
        <div
          key={index}
          onClick={closeColumnsSetState}
          className="cursor-pointer hover:bg-grey-medium dark:hover:bg-grey-dark rounded-md"
        >
          <p className="p-2">{column.title}</p>
          <hr />
        </div>
      );
    })}
  </div>
    </div>
  );
};

export default EditTaskDropDown;
