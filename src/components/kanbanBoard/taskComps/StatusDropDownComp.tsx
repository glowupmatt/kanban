"use client";
import React, { useContext, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classNames from "classNames";
import { deepPurple, grey } from "@mui/material/colors";
import { DataContext } from "@/context/AppContext";
import { TaskType } from "./CreateTaskModal";

type Props = {
  newTask: TaskType;
  setNewTask: React.Dispatch<React.SetStateAction<TaskType>>;
};

const StatusDropDownComp = (props: Props) => {
  const { newTask, setNewTask } = props;
  const { selectedBoard } = useContext(DataContext);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const columns = selectedBoard.columns;
  const openColumns = () => {
    setColumnsOpen((prev) => !prev);
  };
  console.log(selectedBoard, "DISPLAY BOARD");

  return (
    <div className="w-full">
      <p className="text-[0.75rem] font-[700] text-start w-full">Status</p>
      <div
        onClick={openColumns}
        className="w-full border-solid border-2 rounded-md h-[2.5rem] pl-4 flex justify-between items-center min-w-[18.4375rem] dark:border-grey-light border-grey-darkest"
      >
        {newTask.status.column === "" ? (
          <label className="text-[0.75rem] font-[700]">Select Status</label>
        ) : (
          <p className="text-start">{newTask.status.column}</p>
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
        "min-w-[16.4375rem] h-full max-h-[10rem] overflow-scroll bg-grey-light dark:bg-black-dark p-4 rounded-md mt-2",
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
            setNewTask((prev) => ({
              ...prev,
              status: {
                id: column.id,
                column: column.title,
                boardId: column.boardId,
              },
            }));
          setColumnsOpen((prev) => !prev);
        }
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

export default StatusDropDownComp;
