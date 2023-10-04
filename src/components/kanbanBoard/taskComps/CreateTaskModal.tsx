"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { DataContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import StatusDropDownComp from "./StatusDropDownComp";
import CreateTaskFormComp from "./CreateTaskFormComp";

type Props = {};
export type TaskType = {
  title: string;
  description: string;
  subTasks: string[];
  status: { id: string; column: string; boardId: string };
};

const CreateTaskModal = (props: Props) => {
  const { setUpdated } = useContext(DataContext);
  const [newTask, setNewTask] = useState<TaskType>({
    title: "",
    description: "",
    subTasks: [],
    status: {
      id: "",
      column: "",
      boardId: "",
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios
        .post(`/api/task`, newTask)
        .then((res) => {
          console.log(res.data);
          setUpdated(true);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    setNewTask({
      title: "",
      description: "",
      subTasks: [],
      status: { id: "", column: "", boardId: "" },
    });
  };
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
        <form
          className="flex flex-col gap-4 w-full items-center h-full"
          onSubmit={onSubmit}
        >
          <CreateTaskFormComp newTask={newTask} setNewTask={setNewTask} />
          <StatusDropDownComp newTask={newTask} setNewTask={setNewTask} />
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
