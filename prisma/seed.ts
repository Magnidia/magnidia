import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      username: 'alice123',
      profPic: 'http://example.com/path/to/image',
      address: '123 Main St',
    },
  });
  console.log(`Created user with id: ${user.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
