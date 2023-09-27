import prisma from "@/lib/prismaDb";
import getSession from "./getSession";
import { NextResponse } from "next/server";
import getCurrentUser from "./getCurrentUser";

export const getBoards = async (request: NextResponse) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const boards = await prisma.board.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    if (!currentUser) {
      return null;
    }

    return boards;
  } catch (error: any) {
    return null;
  }
};
