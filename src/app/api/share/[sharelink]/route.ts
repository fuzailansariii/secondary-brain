import prismaClient from "@/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Use searchParams to get hash from the query string
    const hash = req.nextUrl.searchParams.get("hash");

    if (!hash) {
      return NextResponse.json(
        { message: "Missing hash parameter" },
        { status: 400 }
      );
    }

    // Find link based on the hash
    const link = await prismaClient.link.findFirst({
      where: { hash },
    });

    if (!link) {
      return NextResponse.json(
        { message: "Invalid or expired link" },
        { status: 404 }
      );
    }

    // Fetch the content related to the user
    const content = await prismaClient.content.findMany({
      where: { userId: link.userId },
    });

    // Fetch user details
    if (link?.userId) {
      const userDetails = await prismaClient.user.findUnique({
        where: { id: link.userId },
      });

      return NextResponse.json({
        message: "Content fetched successfully",
        content,
        userDetails,
      });
    }
    return NextResponse.json({
      message: "user not found, there are some issue",
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { message: "Error fetching content", error: error },
      { status: 500 }
    );
  }
}
