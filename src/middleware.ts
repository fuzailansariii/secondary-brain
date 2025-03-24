import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
    });

    // console.log("Token in middleware:", token);

    const reqPath = request.nextUrl;

    if (!token && reqPath.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
      token &&
      (reqPath.pathname.startsWith("/login") ||
        reqPath.pathname.startsWith("/register"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}
