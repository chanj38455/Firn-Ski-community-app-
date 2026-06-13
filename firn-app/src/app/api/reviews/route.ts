import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const resort = new URL(req.url).searchParams.get("resort");

  const reviews = await prisma.review.findMany({
    where: resort ? { resort } : undefined,
    include: { author: { select: { id: true, name: true, image: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resort, rating, title, body } = await req.json();
  if (!resort || !rating || !title || !body) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: { resort, rating: Number(rating), title, body, authorId: session.user.id },
    include: { author: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json(review, { status: 201 });
}
