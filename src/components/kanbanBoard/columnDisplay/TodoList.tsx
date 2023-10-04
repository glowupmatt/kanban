import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ColumnsType } from "@/types/columnsType";
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
          const { title, description } = task;
          console.log(task, "TASK");
          return (
            <Card key={index} className="w-full p-0 dark:bg-grey-darkest">
              <CardHeader>
                <CardTitle>
                  <p>{title}</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <p>Card Description</p>
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </header>
  );
};

export default TodoList;
