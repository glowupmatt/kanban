import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  children: React.ReactNode;
};

const TaskCard = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Title</CardTitle>
        <CardDescription>Task Description</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default TaskCard;
