import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismaDb";
export async function PUT(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { completed, columnId } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.taskId) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const task = await prisma.task.update({
      where: {
        id: params.taskId,
      },
      include: {
        subTask: true,
      },
      data: {
        columnId: columnId,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.log(error, "Create Task Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
