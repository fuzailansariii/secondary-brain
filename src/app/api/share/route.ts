import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/utils/prismaClient";
import { getServerSession } from "next-auth";
import { Options } from "@/utils/options";
import GenerateRandomString from "@/utils/randomString";

export async function POST(req: NextRequest) {
  const { share } = await req.json();
  const session = await getServerSession(Options);

  try {
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "User not authenticated." },
        { status: 401 }
      );
    }
    const userId = session?.user.id;
    if (share) {
      await prismaClient.link.create({
        data: {
          userId,
          hash: GenerateRandomString(12),
        },
      });
    } else {
      await prismaClient.link.delete({
        where: {
          id: userId,
        },
      });
    }
    return NextResponse.json({
      message: "Updated sharable link",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating sharable link.", error: error },
      { status: 500 }
    );
  }
}
