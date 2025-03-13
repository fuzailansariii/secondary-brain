import prismaClient from "@/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { firstname, lastname, username, email, password } = await req.json();

  // check if the user already exist with this username or email

  try {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      const errorField =
        existingUser?.username === username ? "username" : "email";
      return NextResponse.json(
        {
          message: `${errorField} is already taken`,
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prismaClient.user.create({
      data: {
        username,
        firstname,
        lastname,
        password: hashedPassword,
        email,
      },
    });
    return NextResponse.json({
      message: "User Registered Successfully",
      data: newUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "An error occurred during registration.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
