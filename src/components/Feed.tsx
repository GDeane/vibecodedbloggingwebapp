import React from "react";
import { getGlobalFeed } from "@/lib/posts";
import PostCard from "./PostCard";

export default async function Feed({ searchParams }: { searchParams?: { cursor?: string } }) {
  const cursor = searchParams?.cursor;
  const { posts, nextCursor } = await getGlobalFeed({ cursor, limit: 5 });

  return (
    <div style={{ width: "100%", maxWidth: 600 }}>
      {posts.length === 0 ? (
        <div>No posts yet.</div>
      ) : (
        posts.map((p) => <PostCard key={p.id} post={p} />)
      )}

      {nextCursor ? (
        <div style={{ padding: 12, display: "flex", justifyContent: "center" }}>
          <a href={`/?cursor=${encodeURIComponent(nextCursor)}`}>Load more</a>
        </div>
      ) : null}
    </div>
  );
}
