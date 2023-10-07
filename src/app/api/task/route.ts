import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { title, description, subTask, status } = body;
    const columnId = status.id;
    const columnTitle = status.column;
    const boardId = status.boardId;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!status.id) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const task = await prisma.task.create({
      include: {
        subTask: true,
      },
      data: {
        title,
        description,
        subTask: {
          createMany: {
            data: subTask.map(
              (task: { title: string; completed: boolean }) => ({
                title: task.title,
                completed: task.completed,
              })
            ),
          },
        },
        column: {
          connect: {
            id: columnId,
            title: columnTitle,
          },
        },
        user: {
          connect: {
            id: currentUser.id,
          },
        },
        board: {
          connect: {
            id: boardId,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error: any) {
    console.log(error, "Create Task Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { subTask, tasks } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id: tasks.id,
      },
      data: {
        title: tasks.title,
        description: tasks.description,
        column: {
          connect: {
            id: tasks.columnId,
          },
        },
        subTask: {
          updateMany: subTask.map(
            (task: { id: string; title: string; completed: boolean }) => ({
              where: { id: { equals: task.id } },
              data: {
                title: task.title,
                completed: task.completed,
              },
            })
          ),
        },
      },
    });

    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.log(error, "Create Task Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
