import React from "react";
import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { TaskType } from "./CreateTaskModal";

type Props = {
  newTask: TaskType;
  setNewTask: React.Dispatch<React.SetStateAction<TaskType>>;
};

const CreateTaskFormComp = (props: Props) => {
  const { newTask, setNewTask } = props;
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
  return (
    <div className="w-full flex flex-col gap-3">
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
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setNewTask((prev) => ({
            ...prev,
            subtasks: prev.subtasks.map((sub, i) =>
              i === index ? e.target.value : sub
            ),
          }));
        };
        return (
          <div key={index} className="flex items-center gap-3 w-full">
            <Input
              type="text"
              className="dark:border-grey-light border-grey-darkest border-solid border-2"
              value={subtask}
              onChange={onChange}
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
    </div>
  );
};

export default CreateTaskFormComp;
