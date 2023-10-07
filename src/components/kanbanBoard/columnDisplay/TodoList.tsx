import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { TaskType } from "@/types/taskType";
import { ColumnsType } from "@/types/columnsType";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TaskCard from "../taskComps/TaskCard";
import SelectedTaskDisplay from "../taskComps/SelectedTaskDisplay";

type Props = {
  column: ColumnsType;
};

const TodoList = (props: Props) => {
  const { column } = props;
  const { title, id, tasks } = column;
  return (
    <header className="min-w-[17.5rem]">
      <div className="flex flex-col gap-4">
        <div className="flex w-full gap-2 justify-start items-center">
          <CircleIcon sx={{ fontSize: 15 }} className="text-purple-main" />
          <h4 className="opacity-[.8]">{title}</h4>
        </div>
        {tasks?.map((task, index: number) => {
          const { title, description, subTask, columnId } = task;
          return (
            <Dialog key={index}>
              <DialogTrigger className="text-start">
                <TaskCard
                  title={title}
                  description={description}
                  subTask={subTask}
                  columnId={columnId}
                />
              </DialogTrigger>
              <SelectedTaskDisplay task={task} />
            </Dialog>
          );
        })}
      </div>
    </header>
  );
};

export default TodoList;
