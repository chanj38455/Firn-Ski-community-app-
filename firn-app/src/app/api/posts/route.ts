import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resort = searchParams.get("resort");
  const category = searchParams.get("category");

  const posts = await prisma.post.findMany({
    where: {
      ...(resort && { resort }),
      ...(category && { category }),
    },
    include: {
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { comments: true, votes: true } },
      votes: true,
    },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, body, category, resort } = await req.json();
  if (!title || !body || !category || !resort) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: { title, body, category, resort, authorId: session.user.id },
    include: {
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { comments: true, votes: true } },
    },
  });

  return NextResponse.json(post, { status: 201 });
}
