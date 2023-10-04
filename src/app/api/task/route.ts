import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { title, description, subTasks, status } = body;
    const columnId = status.id;
    const columnTitle = status.column;
    const boardId = status.boardId;
    console.log(body, "body");

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
            data: subTasks.map((title: string) => ({
              title,
            })),
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
