export const columns = {
  id: "",
  title: "",
  createdAt: "",
  UpdatedAt: "",
  userId: "",
  boardId: "",
  tasks: [
    {
      id: "",
      title: "",
      description: "",
      userId: "",
      boardId: "",
      columnId: "",
      createdAt: "",
      updatedAt: "",
      subTask: [{ title: "" }],
    },
  ],
};

export type ColumnsType = typeof columns;
