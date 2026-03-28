import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const verifiedToken = await verifyJwtToken(token);

    if (!verifiedToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: verifiedToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
