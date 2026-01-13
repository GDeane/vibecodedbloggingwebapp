import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(){
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({ data: { username: 'alice', passwordHash: 'hash' } });
  const bob = await prisma.user.create({ data: { username: 'bob', passwordHash: 'hash' } });
  const carol = await prisma.user.create({ data: { username: 'carol', passwordHash: 'hash' } });

  const now = new Date();
  const posts = [
    { authorId: alice.id, content: 'Hello world from Alice', createdAt: new Date(now.getTime() - 1000 * 60 * 60) },
    { authorId: bob.id, content: 'Bob here — second post', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2) },
    { authorId: carol.id, content: "Carol's first post", createdAt: new Date(now.getTime() - 1000 * 60 * 30) },
    { authorId: alice.id, content: 'Another update from Alice', createdAt: new Date(now.getTime() - 1000 * 60 * 10) },
    { authorId: bob.id, content: 'Late night thoughts', createdAt: new Date(now.getTime() - 1000 * 60 * 5) },
  ];

  for (const p of posts){
    await prisma.post.create({ data: p });
  }
  console.log('Seeded posts and users.');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });

