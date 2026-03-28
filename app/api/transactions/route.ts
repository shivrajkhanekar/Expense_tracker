import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwtToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const verifiedToken = await verifyJwtToken(token);
    if (!verifiedToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month"); // Format: YYYY-MM
    const category = searchParams.get("category");

    const whereClause: any = { userId: verifiedToken.id };

    if (month) {
      const startDate = new Date(`${month}-01T00:00:00.000Z`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      
      whereClause.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    if (category) {
      whereClause.category = category;
    }

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      orderBy: { date: "desc" },
    });

    return NextResponse.json(transactions);
  } catch (error: any) {
    return NextResponse.json({ message: "Error fetching transactions", error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const verifiedToken = await verifyJwtToken(token);
    if (!verifiedToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { amount, type, category, description, date } = await req.json();

    if (!amount || !type || !category || !description || !date) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        type,
        category,
        description,
        date: new Date(date),
        userId: verifiedToken.id,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error creating transaction", error: error.message }, { status: 500 });
  }
}
