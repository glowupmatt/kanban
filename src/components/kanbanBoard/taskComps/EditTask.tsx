import React, { useState, useContext } from 'react'
import { DataContext } from "@/context/AppContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deepPurple } from "@mui/material/colors";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"
import CloseIcon from "@mui/icons-material/Close";
import EditTaskDropDown from './EditTaskDropDown';
import { Input } from '@/components/ui/input';
import { TaskType } from './CreateTaskModal';
import classNames from 'classnames';
import { Button } from '@mui/material';
import axios from 'axios';
  
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
    }
}

const EditTask = (props: Props) => {
    const { task } = props
    const { id, title, description, subTask, columnId, boardId } = task
    const { setUpdated } = useContext(DataContext);
    const [completedSubTaskLengthStorage, setCompletedSubTaskLengthStorage] =
    useState<string[]>([]);
  const [selectedCurrentStatus, setSelectedCurrentStatus] =
    useState<string>(columnId);
  const [checked, setChecked] = useState(
    subTask.filter((task) => task.completed === true)
  );
  const [currentTaskInfo, setCurrentTaskInfo] = useState({
    title: title,
    description: description,
    subTask: [...subTask],
    status: {
      column: selectedCurrentStatus,
      boardId: boardId,
    },
  });
  const removeColumnHandler = (index: number) => {
    setCurrentTaskInfo((prev) => ({
      ...prev,
      subTask: prev.subTask.filter((_, i) => i !== index),
    }));
  };
  // const addSubTask = () => {
  //   setCurrentTaskInfo((prev) => ({
  //     ...prev,
  //     subTask: [
  //       ...prev.subTask,
  //       {
  //         title: "Add Subtask",
  //         completed: false,
  //       },
  //     ],
  //   }));
  // };

  const updateSubTask = (index: number, newTitle: string, newCompleted: boolean) => {
    setCurrentTaskInfo((prev) => {
      const updatedSubTasks = [...prev.subTask];
      updatedSubTasks[index] = {
        ...updatedSubTasks[index],
        title: newTitle,
        completed: newCompleted,
      };
      return { ...prev, subTask: updatedSubTasks };
    });
  };

  console.log(currentTaskInfo, "CURRENT TASK INFO")
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios
        .put(`/api/task`, currentTaskInfo)
        .then((res) => {
          res.data;
          setUpdated(true);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    setCurrentTaskInfo({
      title: title,
      description: description,
      subTask: [...subTask],
      status: {
        column: selectedCurrentStatus,
        boardId: boardId,
      },
    });
  };

  return (
<Dialog>
  <DialogTrigger>
    <MoreVertIcon sx={{ color: deepPurple[`A100`] }} />
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Task</DialogTitle>
        <form onSubmit={onSubmitHandler} className='w-full flex flex-col gap-3'>
          <div>
            <label htmlFor="title" className="text-[0.75rem] font-[700]">
                Title
            </label>
            <Input
                id="title"
                type="text"
                placeholder={task.title}
                value={currentTaskInfo.title}
                className={classNames(
                "border-solid border-2",
                { "border-red-main": task.title === "" },
                {
                "dark:border-grey-light border-grey-darkest": task.title !== "",
                }
                )}
                onChange={(e) => {
                    setCurrentTaskInfo({ ...currentTaskInfo, title: e.target.value });
                }}
            />
            </div>
            <div>
            <label htmlFor="description" className="text-[0.75rem] font-[700]">
                Description
            </label>
            <textarea
                id="description"
                placeholder={task.description}
                value={currentTaskInfo.description}
                className={classNames(
                "border-solid border-2 min-h-[7rem] w-full bg-transparent p-2 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                { "border-red-main": task.description === "" },
                {
                    "dark:border-grey-light border-grey-darkest ":
                    task.description !== "",
                }
                )}
                onChange={(e) => {
                setCurrentTaskInfo({ ...currentTaskInfo, description: e.target.value });
                }}
            />
            </div>
            <div className='w-full flex flex-col gap-3'>
                <h3>Subtasks</h3>
                <div className='flex flex-col gap-3'>
                    {currentTaskInfo.subTask.map((subTask, index) => {
                    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    setCurrentTaskInfo((prev) => ({
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
                        placeholder={subTask.title}
                        onChange={onChange}
                        />
                        <div onClick={() => removeColumnHandler(index)}>
                        <CloseIcon className="text-grey-medium" />
                        </div>
                    </div>
                    );
                })}
                </div>
                <div //onClick={addSubTask}
                  className="flex text-purple-main w-full dark:bg-white bg-grey-light rounded-full max-h-[2.5rem] justify-center items-center gap-1 h-[2.5rem]">
                  <p className="font-[700]">+ Add New Subtask</p>
                </div>
            </div>
              <div>
                  <EditTaskDropDown
                  task={task}
                  selectedCurrentStatus={selectedCurrentStatus}
                  setSelectedCurrentStatus={setSelectedCurrentStatus}
                  />
              </div>
            <Button
            type="submit"
            className="flex text-white bg-purple-main rounded-full max-h-[2.5rem]  justify-center items-center gap-1 self-center w-full"
          >
            <DialogClose>
              <p className="font-[700]">Save Changes</p>
            </DialogClose>
          </Button>
        </form>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default EditTask