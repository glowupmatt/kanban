"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

type Props = {
  index: number;
  task: {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    taskId: string;
  };
  completedSubTaskLengthStorage: string[];
  setCompletedSubTaskLengthStorage: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  setChecked: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        title: string;
        completed: boolean;
        createdAt: string;
        updatedAt: string;
        taskId: string;
      }[]
    >
  >;
  checked: {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    taskId: string;
  }[];
};

const SubTaskList = (props: Props) => {
  const {
    index,
    task,
    completedSubTaskLengthStorage,
    setCompletedSubTaskLengthStorage,
    setChecked,
    checked,
  } = props;
  const { title, completed, id } = task;

  const onCheckHandler = (selectedId: string) => {
    setChecked((prev) => {
      const newChecked = prev.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
      return newChecked;
    });
    setCompletedSubTaskLengthStorage((prev) =>
      prev.includes(selectedId)
        ? prev.filter((id) => id !== selectedId)
        : [...prev, selectedId]
    );
  };
  console.log(completedSubTaskLengthStorage);

  return (
    <div
      key={index}
      className="flex justify-start items-center gap-4 w-full max-w-[18.4375rem] min-h-[2.5rem] bg-white dark:bg-black-dark p-4"
    >
      <Checkbox
        id={`task${id}`}
        checked={checked.map((task) => task.completed === true)[index]}
        onClick={() => onCheckHandler(id)}
      />
      <Label htmlFor={`task${id}`} className="cursor-pointer w-full">
        {checked.map((task) => task.completed === true)[index] ? (
          <s> {title}</s>
        ) : (
          <p> {title}</p>
        )}
      </Label>
    </div>
  );
};

export default SubTaskList;
