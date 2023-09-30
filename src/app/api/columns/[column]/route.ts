import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(
  request: Request,
  { params }: { params: { columnId: string; boardId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    console.log(params.columnId, "params.columnId");

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
