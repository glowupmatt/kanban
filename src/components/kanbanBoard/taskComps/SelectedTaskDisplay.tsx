"use client";
import React, { useState, useContext } from "react";
import axios from "axios";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SubTaskList from "./SubTaskList";
import EditTaskDropDown from "./EditTaskDropDown";
import SubmitEditButton from "./SubmitEditButton";
import { DataContext } from "@/context/AppContext";
import EditTask from "./EditTask";

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

  const [completedSubTaskLengthStorage, setCompletedSubTaskLengthStorage] =
    useState<string[]>([]);
  const [selectedCurrentStatus, setSelectedCurrentStatus] =
    useState<string>(columnId);
  const [checked, setChecked] = useState(
    subTask.filter((task) => task.completed === true)
  );
  const hasSelectedTask = (
    id: string,
    completedSubTaskLengthStorage: string[]
  ) => {
    if (
      subTask.find((data) => data.completed === true) &&
      completedSubTaskLengthStorage.includes(id)
    ) {
      return false;
    } else {
      return true;
    }
  };

  const completedSubTask = subTask.filter((task) => {
    return task.completed === true;
  });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      subTask: checked.map((task) => {
        hasSelectedTask(task.id, completedSubTaskLengthStorage);
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
          setCompletedSubTaskLengthStorage([]);
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
            <EditTask task={task}/>
          </div>
        </div>
        <DialogDescription className="flex justify-between w-full max-w-[19rem]">
          {description}
        </DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-3" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-[1.5rem]">
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
                  checked={checked}
                  setChecked={setChecked}
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
