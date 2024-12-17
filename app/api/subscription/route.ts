import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createPaymentOrder } from "@/lib/razorpay";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const { planId } = data;

  const plan = await prisma.plan.findUnique({
    where: { id: planId }
  });

  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  try {
    const order = await createPaymentOrder(plan.price);
    
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}