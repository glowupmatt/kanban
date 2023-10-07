export type TaskType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  columnId: string;
  boardId: string;
  subTask: SubTaskType[];
};

export type SubTaskType = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  taskId: string;
  status: {
    id: string;
    column: string;
    boardId: string;
  };
};
