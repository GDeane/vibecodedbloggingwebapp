import React from "react";

export default function PostCard({ post }: { post: { id: number; content: string; createdAt: string | Date; author: { username: string; displayName?: string | null } } }) {
  const createdAt = typeof post.createdAt === "string" ? new Date(post.createdAt) : post.createdAt;
  return (
    <article style={{ borderBottom: "1px solid #eee", padding: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 600 }}>{post.author.displayName ?? post.author.username}</div>
      <div style={{ color: "#666", fontSize: 12 }}>{post.author.username} · {createdAt.toLocaleString()}</div>
      <div style={{ marginTop: 8 }}>{post.content}</div>
    </article>
  );
}

