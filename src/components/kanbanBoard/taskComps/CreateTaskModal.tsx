"use client";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deepPurple, grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "@/components/ui/input";
import { DataContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classNames from "classNames";

type Props = {};
type TaskType = {
  title: string;
  description: string;
  subtasks: string[];
  status: string;
};

const CreateTaskModal = (props: Props) => {
  const { displayBoard, selectedBoardId, setUpdated } = useContext(DataContext);
  console.log(displayBoard, "DISPLAY BOARD");
  console.log(selectedBoardId, "SELECTED BOARD ID");
  const columns = displayBoard[0]?.columns;
  const [newTask, setNewTask] = useState<TaskType>({
    title: "",
    description: "",
    subtasks: [],
    status: "",
  });
  const [columnsOpen, setColumnsOpen] = useState(false);
  const openColumns = () => {
    setColumnsOpen((prev) => !prev);
  };

  const removeColumnHandler = (index: number) => {
    setNewTask((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index),
    }));
  };

  const addSubTask = () => {
    setNewTask((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, "Add Subtask"],
    }));
  };

  console.log(newTask, "NEW TASK");
  return (
    <Dialog>
      <DialogTrigger className="p-4 bg-purple-main max-w-[3rem] max-h-[2rem] flex justify-center items-center rounded-full hover:bg-purple-hover md:max-w-[10.25rem] md:max-h-[3rem]">
        <AddIcon sx={{ color: grey[50] }} />
        <h3 className="font-[700] hidden md:block text-white">Add New Task</h3>
      </DialogTrigger>
      <DialogContent className="dark:bg-grey-darkest p-4 rounded-md max-w-[21.4375rem] overflow-scroll max-h-full w-full">
        <DialogHeader>
          <DialogTitle className="text-start">Add New Task</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 w-full items-center h-full">
          <label htmlFor="title" className="text-[0.75rem] font-[700]">
            Title
          </label>
          <Input
            id="title"
            type="text"
            value={newTask.title}
            className="dark:border-grey-light border-grey-darkest border-solid border-2"
            onChange={(e) => {
              setNewTask({ ...newTask, title: e.target.value });
            }}
          />
          <label htmlFor="description" className="text-[0.75rem] font-[700]">
            Description
          </label>
          <textarea
            id="description"
            value={newTask.description}
            className="dark:border-grey-light border-grey-darkest border-solid border-2 min-h-[7rem] w-full bg-transparent p-2 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              setNewTask({ ...newTask, description: e.target.value });
            }}
          />
          {newTask.subtasks.map((subtask, index) => {
            return (
              <div key={index} className="flex items-center gap-3 w-full">
                <Input
                  type="text"
                  className="dark:border-grey-light border-grey-darkest border-solid border-2"
                  value={subtask}
                />
                <div onClick={() => removeColumnHandler(index)}>
                  <CloseIcon className="text-grey-medium" />
                </div>
              </div>
            );
          })}
          <div
            onClick={addSubTask}
            className="flex text-purple-main w-full dark:bg-white bg-grey-light rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 h-[2.5rem]"
          >
            <p className="font-[700]">+ Add New Subtask</p>
          </div>
          <p className="text-[0.75rem] font-[700] text-start w-full">Status</p>
          <div>
            <div
              onClick={openColumns}
              className="w-full border-solid border-2 rounded-md h-[2.5rem] pl-4 flex justify-between items-center min-w-[18.4375rem]"
            >
              {newTask.status === "" ? (
                <label className="text-[0.75rem] font-[700]">
                  Select Status
                </label>
              ) : (
                <p className="text-start">{newTask.status}</p>
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
                "min-w-[18.4375rem] h-full max-h-[10rem] overflow-scroll",
                {
                  "hidden": columnsOpen,
                },
                {
                  "flex flex-col gap-2": !columnsOpen,
                }
              )}
            >
              {columns?.map((column, index) => {
                 const closeColumnsSetState = () => {
                  setNewTask({ ...newTask, status: column.title })
                  setColumnsOpen((prev) => !prev);
                }
                return (
                  <div
                    key={index}
                    onClick={closeColumnsSetState}
                  >
                    <p className="p-2">{column.title}</p>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            type="submit"
            className="flex text-white bg-purple-main rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 self-center w-full"
          >
            <DialogClose>
              <p className="font-[700]">Save Changes</p>
            </DialogClose>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal;
