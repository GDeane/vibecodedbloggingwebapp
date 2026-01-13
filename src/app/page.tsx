import Feed from "../components/Feed";

export default function Home({ searchParams }: { searchParams?: { cursor?: string } }) {
  // Server component will fetch feed
  return (
    <main style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <Feed searchParams={searchParams} />
    </main>
  );
}
