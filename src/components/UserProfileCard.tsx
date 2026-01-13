import React from "react";

export default function UserProfileCard({ user }: { user: { username: string; displayName?: string | null; bio?: string | null; createdAt: string | Date } }) {
  const createdAt = typeof user.createdAt === "string" ? new Date(user.createdAt) : user.createdAt;
  return (
    <div style={{ border: "1px solid #eee", padding: 12, marginBottom: 12 }}>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{user.displayName ?? user.username}</div>
      <div style={{ color: "#666", fontSize: 13 }}>@{user.username} · joined {createdAt.toLocaleDateString()}</div>
      {user.bio ? <div style={{ marginTop: 8 }}>{user.bio}</div> : null}
    </div>
  );
}

