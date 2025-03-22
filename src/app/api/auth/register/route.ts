import prismaClient from "@/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { firstname, lastname, username, email, password } = await req.json();

    // check if the user already exist with this username or email
    if (!firstname || !username || !email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }
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
    // Hash the password and create user
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
    return NextResponse.json(
      {
        message: "User Registered Successfully",
        userData: {
          id: newUser.id,
          email: newUser.email,
          firstname: newUser.firstname,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error occurred during registration.",
        error: error,
      },
      { status: 500 }
    );
  }
}
