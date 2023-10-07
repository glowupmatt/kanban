"use client";
import React, { useState, useContext, use } from "react";
import axios from "axios";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deepPurple, grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SubTaskList from "./SubTaskList";
import EditTaskDropDown from "./EditTaskDropDown";
import SubmitEditButton from "./SubmitEditButton";
import { DataContext } from "@/context/AppContext";

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
};

const SelectedTaskDisplay = (props: Props) => {
  const { setUpdated } = useContext(DataContext);
  const { task } = props;
  const { title, description, subTask, columnId } = task;
  const completedSubTask = subTask.filter((task) => task.completed === true);
  const [completedSubTaskLengthStorage, setCompletedSubTaskLengthStorage] =
    useState<string[]>([]);
  const [selectedCurrentStatus, setSelectedCurrentStatus] =
    useState<string>(columnId);
  const hasSelectedTask = (
    id: string,
    completedSubTaskLengthStorage: string[]
  ) => {
    return completedSubTaskLengthStorage.includes(id);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      subTask: task.subTask.map((task) => {
        return {
          ...task,
          completed: hasSelectedTask(task.id, completedSubTaskLengthStorage),
        };
      }),
      tasks: {
        ...task,
        columnId: selectedCurrentStatus,
      },
    };
    try {
      const response = await axios
        .put(`/api/task`, data)
        .then((res) => res)
        .finally(() => {
          setUpdated(true);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DialogContent className="dark:bg-grey-darkest p-4 rounded-md max-w-[21.4375rem] overflow-scroll max-h-full">
      <DialogHeader className="text-start">
        <div className="flex w-full justify-between">
          <DialogTitle>{title}</DialogTitle>
          <div className="">
            <MoreVertIcon sx={{ color: deepPurple[`A100`] }} />
          </div>
        </div>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-3" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-[1.5rem]">
          <h4>
            Subtasks {completedSubTask.length} of {subTask.length}
          </h4>
          <div className="flex flex-col gap-2">
            {subTask.map((task, index) => {
              return (
                <SubTaskList
                  key={index}
                  task={task}
                  index={index}
                  completedSubTaskLengthStorage={completedSubTaskLengthStorage}
                  setCompletedSubTaskLengthStorage={
                    setCompletedSubTaskLengthStorage
                  }
                />
              );
            })}
          </div>
        </div>
        <EditTaskDropDown
          task={task}
          selectedCurrentStatus={selectedCurrentStatus}
          setSelectedCurrentStatus={setSelectedCurrentStatus}
        />
        <SubmitEditButton />
      </form>
    </DialogContent>
  );
};

export default SelectedTaskDisplay;
