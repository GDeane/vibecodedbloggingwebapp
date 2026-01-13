import React from "react";
import { getUserProfile, getUserPosts } from "@/lib/users";
import UserProfileCard from "@/components/UserProfileCard";
import PostCard from "@/components/PostCard";

export default async function ProfilePage({ params, searchParams }: { params: { username: string }; searchParams?: { cursor?: string } }) {
  const usernameParam = params?.username;
  const username = typeof usernameParam === 'string' ? usernameParam.toLowerCase() : '';

  if (!username) {
    return (
      <main style={{ padding: 40 }}>
        <h1>User not found</h1>
      </main>
    );
  }

  const user = await getUserProfile(username);
  if (!user) {
    return (
      <main style={{ padding: 40 }}>
        <h1>User not found</h1>
      </main>
    );
  }

  const { posts, nextCursor } = await getUserPosts({ username, cursor: searchParams?.cursor, limit: 10 });

  return (
    <main style={{ padding: 24 }}>
      <UserProfileCard user={user} />
      <section>
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <div>No posts yet.</div>
        ) : (
          posts.map((p) => <PostCard key={p.id} post={p} />)
        )}

        {nextCursor ? (
          <div style={{ padding: 12, display: "flex", justifyContent: "center" }}>
            <a href={`/u/${encodeURIComponent(username)}?cursor=${encodeURIComponent(nextCursor)}`}>Load more</a>
          </div>
        ) : null}
      </section>
    </main>
  );
}
