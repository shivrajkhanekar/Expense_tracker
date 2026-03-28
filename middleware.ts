import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./lib/auth";

const protectedRoutes = ["/dashboard", "/transactions"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const verifiedToken = await verifyJwtToken(token);

    if (!verifiedToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname === "/login" || pathname === "/signup") {
    const token = request.cookies.get("token")?.value;
    if (token) {
      const verifiedToken = await verifyJwtToken(token);
      if (verifiedToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

// Config to optimize middleware execution
export const config = {
  matcher: ["/dashboard/:path*", "/transactions/:path*", "/login", "/signup"],
};
