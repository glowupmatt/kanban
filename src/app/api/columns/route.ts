import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const columns = await prisma.column.findMany({
      where: {
        userId: currentUser.id,
      },
    });
    return new NextResponse(JSON.stringify(columns), { status: 200 });
  } catch (error) {
    console.log(error, "Get Columns Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
