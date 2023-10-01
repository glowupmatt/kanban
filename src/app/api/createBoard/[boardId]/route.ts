import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const board = await prisma.board.findUnique({
      where: {
        id: params.boardId,
      },
      include: {
        columns: true,
      },
    });
    return new NextResponse(JSON.stringify(board), { status: 200 });
  } catch (error) {
    console.log(error, "Get Board Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { title, columns } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const board = await prisma.board.update({
      where: {
        id: params.boardId,
      },
      include: {
        columns: true,
      },
      data: {
        title,
        userId: currentUser.id,
        columns:
          columns.length > 0
            ? {
                createMany: {
                  data: columns.map((title: string) => ({
                    title,
                    userId: currentUser.id,
                  })),
                },
              }
            : undefined,
      },
    });

    return new NextResponse(JSON.stringify(board), { status: 200 });
  } catch (error: any) {
    console.log(error, "Create Board Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const board = await prisma.board.delete({
      where: {
        id: params.boardId,
      },
      include: {
        columns: true,
      },
    });

    return new NextResponse(JSON.stringify(board), { status: 200 });
  } catch (error: any) {
    console.log(error, "Delete Board Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
