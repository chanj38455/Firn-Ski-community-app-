import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: postId } = await params;
  const { value } = await req.json();
  if (value !== 1 && value !== -1) {
    return NextResponse.json({ error: "Value must be 1 or -1" }, { status: 400 });
  }

  const existing = await prisma.vote.findUnique({
    where: { postId_userId: { postId, userId: session.user.id } },
  });

  if (existing) {
    if (existing.value === value) {
      await prisma.vote.delete({ where: { id: existing.id } });
    } else {
      await prisma.vote.update({ where: { id: existing.id }, data: { value } });
    }
  } else {
    await prisma.vote.create({ data: { postId, userId: session.user.id, value } });
  }

  const votes = await prisma.vote.findMany({ where: { postId } });
  return NextResponse.json({ score: votes.reduce((s, v) => s + v.value, 0) });
}
