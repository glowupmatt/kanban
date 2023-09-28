import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
type Props = {
  column: any;
};

const TodoList = (props: Props) => {
  const { column } = props;
  const { title, id } = column;
  return (
    <header className="min-w-[17.5rem]">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex w-full gap-2 justify-start items-center">
          <CircleIcon sx={{ fontSize: 15 }} className="text-purple-main" />
          <h4 className="opacity-[.8]">{title}</h4>
        </div>
        <Card className="w-full p-0 dark:bg-grey-darkest">
          <CardHeader>
            <CardTitle>
              <p>Card Title</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p>Card Description</p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </header>
  );
};

export default TodoList;
