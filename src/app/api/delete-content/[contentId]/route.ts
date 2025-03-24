import prismaClient from "@/utils/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();
  try {
    // Extract contentId from query param
    // const contentId = req.nextUrl.searchParams.get("contentId");
    const contentId = req.nextUrl.pathname.split("/")[4];
    if (!contentId) {
      return NextResponse.json(
        {
          message: "ContentID is Required.",
        },
        { status: 400 }
      );
    }

    // converting from string to Int

    // Extracting user from JWT
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json(
        {
          message: "You are not Authenticated.",
        },
        { status: 401 }
      );
    }

    // Fetch the content from the database
    const content = await prismaClient.content.findUnique({
      where: {
        id: contentId,
      },
    });

    if (!content) {
      return NextResponse.json({
        message: "content not found.",
      });
    }

    // Checking if the user is authorized to delete the content
    if (content.userId !== userId) {
      return NextResponse.json(
        {
          message: "You are not authorize to delete this content",
        },
        {
          status: 403,
        }
      );
    }

    // Deleting the content
    await prismaClient.content.delete({
      where: {
        id: contentId,
      },
    });

    return NextResponse.json(
      {
        message: "Content deleted successfully",
      },
      { status: 200 }
    );
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
