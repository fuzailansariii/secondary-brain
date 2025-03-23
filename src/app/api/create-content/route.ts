import { Options } from "@/utils/options";
import prismaClient from "@/utils/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// interface ContentTypeProps {
//   title: string;
//   type: string;
//   link: string;
//   tags: string[];
// }

export async function POST(req: NextRequest) {
  const session = await getServerSession(Options);
  try {
    const { title, type, link } = await req.json();
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json({
        message: "User not authenticated",
      });
    }

    const newContent = await prismaClient.content.create({
      data: {
        title,
        link,
        type,
        userId,
      },
    });

    return NextResponse.json({
      message: "Content added successfully",
      contentId: newContent.id,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error adding the content",
      error: error.message,
    });
  }
}
