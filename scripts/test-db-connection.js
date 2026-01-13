const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  const user = await prisma.user.create({ data: { username: 'testuser', passwordHash: 'hash' } });
  console.log('Created user:', user);
  const fetched = await prisma.user.findUnique({ where: { username: 'testuser' } });
  console.log('Fetched user:', fetched);
  await prisma.user.delete({ where: { id: user.id } });
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
