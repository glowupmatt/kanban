import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(
  request: Request,
  { params }: { params: { columnId: string; boardId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { title, columns, task } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const column = await prisma.column.delete({
      where: {
        id: params.columnId,
      },
      include: {
        task: true,
      },
    });

    return new NextResponse(JSON.stringify(column), { status: 200 });
  } catch (error) {
    console.log(error, "Delete Column Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { columnId: string; boardId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { title, columns, task } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const column = await prisma.column.update({
      where: {
        id: params.columnId,
      },
      include: {
        task: true,
      },
      data: {
        title,
        task:
          task.length > 0
            ? {
                createMany: {
                  data: task.map((title: string) => ({
                    title,
                  })),
                },
              }
            : undefined,
      },
    });

    return new NextResponse(JSON.stringify(column), { status: 200 });
  } catch (error) {
    console.log(error, "Update Column Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
