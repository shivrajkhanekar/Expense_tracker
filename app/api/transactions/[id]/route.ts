import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwtToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // In Next.js App Router 15+, params is a Promise
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const verifiedToken = await verifyJwtToken(token);
    if (!verifiedToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const routeParams = await params;
    const { id } = routeParams;
    const { amount, type, category, description, date } = await req.json();

    const existingTransaction = await prisma.transaction.findUnique({ where: { id } });
    
    if (!existingTransaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    if (existingTransaction.userId !== verifiedToken.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        ...(amount && { amount: parseFloat(amount) }),
        ...(type && { type }),
        ...(category && { category }),
        ...(description && { description }),
        ...(date && { date: new Date(date) }),
      },
    });

    return NextResponse.json(updatedTransaction);
  } catch (error: any) {
    return NextResponse.json({ message: "Error updating transaction", error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const verifiedToken = await verifyJwtToken(token);
    if (!verifiedToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const routeParams = await params;
    const { id } = routeParams;

    const existingTransaction = await prisma.transaction.findUnique({ where: { id } });
    
    if (!existingTransaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    if (existingTransaction.userId !== verifiedToken.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: "Error deleting transaction", error: error.message }, { status: 500 });
  }
}
