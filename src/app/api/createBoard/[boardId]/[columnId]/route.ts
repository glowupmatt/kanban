import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(
  request: Request,
  { params }: { params: { columnId: string; boardId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const column = await prisma.column.delete({
      where: {
        id: params.columnId,
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
  { params }: { params: { boardId: string; columnId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { title } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const column = await prisma.column.updateMany({
      where: {
        boardId: params.boardId,
        id: params.columnId,
      },
      data: {
        title: title,
      },
    });
    return new NextResponse(JSON.stringify(column), { status: 200 });
  } catch (error) {
    console.log(error, "Update Column Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { columnId: string; boardId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.boardId) {
      return new NextResponse("Invalid board ID", { status: 400 });
    }

    const column = await prisma.column.findUnique({
      where: {
        boardId: params.boardId,
        id: params.columnId,
      },
      include: {
        tasks: {
          include: {
            subTask: true,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(column), { status: 200 });
  } catch (error) {
    console.log(error, "Get Column Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
