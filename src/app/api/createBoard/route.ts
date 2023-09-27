import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
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

    const board = await prisma.board.create({
      include: {
        columns: true,
      },
      data: {
        title,
        userId: currentUser.id,
        columns: {
          createMany: {
            data: columns.map((title: string) => ({
              title,
              userId: currentUser.id,
            })),
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(board), { status: 200 });
  } catch (error: any) {
    console.log(error, "Create Board Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
