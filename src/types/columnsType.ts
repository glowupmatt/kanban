export const columns = {
  id: "651cefc6700b51364fba5705",
  title: "New Column",
  createdAt: "2023-10-04T04:53:26.268Z",
  UpdatedAt: "2023-10-04T04:53:26.268Z",
  userId: "651cee5d700b51364fba5701",
  boardId: "651cefc6700b51364fba5704",
  tasks: [
    {
      id: "651ceffa700b51364fba5708",
      title: "New Task",
      description: "Hello Task",
      createdAt: "2023-10-04T04:54:18.130Z",
      updatedAt: "2023-10-04T04:54:18.130Z",
      userId: "651cee5d700b51364fba5701",
      columnId: "651cefc6700b51364fba5705",
      boardId: "651cefc6700b51364fba5704",
      subTask: [
        {
          id: "651ceffa700b51364fba5709",
          title: [{ title: "" }],
          completed: false,
          createdAt: "2023-10-04T04:54:18.130Z",
          updatedAt: "2023-10-04T04:54:18.130Z",
          taskId: "651ceffa700b51364fba5708",
        },
      ],
    },
  ],
};

export type ColumnsType = typeof columns;
