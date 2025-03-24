import { Options } from "@/utils/options";
import prismaClient from "@/utils/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(Options);
  try {
    // const userId = await UserIdByJWT(req);
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json(
        {
          message: "User not authenticated.",
        },
        { status: 404 }
      );
    }

    const allContent = await prismaClient.content.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json({
      message: "Contents fetched successfully",
      data: allContent,
    });
  } catch (error) {
    let errorMessage = "Unknown error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        message: "Error fetching Contents.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
