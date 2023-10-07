import React from "react";
import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { TaskType } from "./CreateTaskModal";
import classNames from "classNames";

type Props = {
  task: TaskType;
  setTask: React.Dispatch<React.SetStateAction<TaskType>>;
  isFormValid: boolean;
};

const CreateTaskFormComp = (props: Props) => {
  const { task, setTask, isFormValid } = props;
  const removeColumnHandler = (index: number) => {
    setTask((prev) => ({
      ...prev,
      subTask: prev.subTask.filter((_, i) => i !== index),
    }));
  };
  const addSubTask = () => {
    setTask((prev) => ({
      ...prev,
      subTask: [
        ...prev.subTask,
        {
          title: "Add Subtask",
          completed: false,
        },
      ],
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
        value={task.title}
        className={classNames(
          "border-solid border-2",
          { "border-red-main": task.title === "" },
          {
            "dark:border-grey-light border-grey-darkest ": task.title !== "",
          }
        )}
        onChange={(e) => {
          setTask({ ...task, title: e.target.value });
        }}
      />
      <label htmlFor="description" className="text-[0.75rem] font-[700]">
        Description
      </label>
      <textarea
        id="description"
        value={task.description}
        className={classNames(
          "border-solid border-2 min-h-[7rem] w-full bg-transparent p-2 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          { "border-red-main": task.description === "" },
          {
            "dark:border-grey-light border-grey-darkest ":
              task.description !== "",
          }
        )}
        onChange={(e) => {
          setTask({ ...task, description: e.target.value });
        }}
      />
      {!task.subTask ? (
        <p className="w-full text-center text-red-main font-[700]">
          Must Add Subtask
        </p>
      ) : null}
      {task.subTask.map((subTask, index) => {
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          setTask((prev) => ({
            ...prev,
            subTask: prev.subTask.map((sub, i) =>
              i === index ? { ...sub, title: value } : sub
            ),
          }));
        };
        return (
          <div key={index} className="flex items-center gap-3 w-full">
            <Input
              type="text"
              className="dark:border-grey-light border-grey-darkest border-solid border-2"
              value={subTask.title}
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
