import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export type UserProfile = {
  id: number;
  username: string;
  displayName?: string | null;
  bio?: string | null;
  createdAt: Date;
};

export async function getUserProfile(username: string): Promise<UserProfile | null> {
  if (!username) return null;
  const uname = String(username).toLowerCase();

  const user = await prisma.user.findUnique({
    where: { username: uname },
    select: { id: true, username: true, displayName: true, bio: true, createdAt: true },
  });
  return user;
}

// cursor is `${createdAt.toISOString()}::${id}`
export async function getUserPosts({ username, cursor, limit = 5 }: { username: string; cursor?: string; limit?: number }) {
  if (!username) return { posts: [], nextCursor: null };
  const uname = String(username).toLowerCase();

  const user = await prisma.user.findUnique({ where: { username: uname }, select: { id: true } });
  if (!user) return { posts: [], nextCursor: null };

  let cursorDate: Date | undefined;
  let cursorId: number | undefined;

  if (cursor) {
    const parts = cursor.split("::");
    if (parts.length === 2) {
      cursorDate = new Date(parts[0]);
      cursorId = parseInt(parts[1], 10);
      if (Number.isNaN(cursorId)) cursorId = undefined;
    }
  }

  const where: Prisma.PostWhereInput = { parentPostId: null, authorId: user.id };

  if (cursorDate) {
    where.OR = [
      { createdAt: { lt: cursorDate } },
      { AND: [{ createdAt: cursorDate }, { id: { lt: cursorId ?? 0 } }] },
    ];
  }

  const take = (limit ?? 5) + 1;

  const rows = await prisma.post.findMany({
    where,
    include: { author: true },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take,
  });

  let nextCursor: string | null = null;
  const posts = rows.slice(0, limit ?? 5).map((p) => ({
    id: p.id,
    content: p.content,
    createdAt: p.createdAt,
    author: { id: p.author.id, username: p.author.username, displayName: p.author.displayName },
  }));

  if (rows.length === take) {
    const last = rows[rows.length - 1];
    nextCursor = `${last.createdAt.toISOString()}::${last.id}`;
  }

  return { posts, nextCursor };
}
