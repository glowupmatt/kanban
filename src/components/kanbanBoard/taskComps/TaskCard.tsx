import React from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
  subTask: {
    title: string;
    completed: boolean;
  }[];
  columnId: string;
};

const TaskCard = (props: Props) => {
  const { title, description, subTask, columnId } = props;
  return (
    <Card className="w-full p-0 dark:bg-grey-darkest">
      <CardHeader>
        <CardTitle>
          <p>{title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="flex justify-between w-full max-w-[19rem]">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
