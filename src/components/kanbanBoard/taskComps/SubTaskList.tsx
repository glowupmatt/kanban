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
};

const SubTaskList = (props: Props) => {
  const {
    index,
    task,
    completedSubTaskLengthStorage,
    setCompletedSubTaskLengthStorage,
  } = props;
  const { title, completed, id } = task;
  const [checked, setChecked] = useState(false);
  const onCheckHandler = (selectedId: string) => {
    setChecked((prev) => !prev);
    setCompletedSubTaskLengthStorage((prev) =>
      prev.includes(selectedId)
        ? prev.filter((id) => id !== selectedId)
        : [...prev, selectedId]
    );
  };

  return (
    <div
      key={index}
      className="flex justify-start items-center gap-4 w-full max-w-[18.4375rem] min-h-[2.5rem] bg-white dark:bg-black-dark p-4"
    >
      <Checkbox id={`task${id}`} onClick={() => onCheckHandler(id)} />
      <Label htmlFor={`task${id}`} className="cursor-pointer">
        {checked === true ? <s>{title}</s> : title}
      </Label>
    </div>
  );
};

export default SubTaskList;
