import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.ticket.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();
}


async function seedDatabase() {
  // create user entries first because they are used in event and ticket entries.
  const testUser = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      username: 'alice123',
      profPic: 'http://example.com/path/to/image',
      address: '123 Main St',
    },
  });
  console.log(`Created user with id: ${testUser.id}`);

  const event1 = await prisma.event.create({
    data: {
      name: 'Dummy Event 1',
      userId: testUser.id,
      images: [
        "https://magnidia-imageupload.s3.us-east-2.amazonaws.com/ATL+Banner.jpeg"
      ],
      date: new Date()
    },
  });

  const event2 = await prisma.event.create({
    data: {
      name: 'Dummy Event 2',
      userId: testUser.id,
      images: [
        "https://magnidia-imageupload.s3.us-east-2.amazonaws.com/demo.png"
      ],
      date: new Date()
    },
  });

  const event3 = await prisma.event.create({
    data: {
      name: 'Dummy Event 3',
      userId: testUser.id,
      images: [
        "https://magnidia-imageupload.s3.us-east-2.amazonaws.com/GT+Header+2.jpeg"
      ],
      date: new Date()
    },
  });


}

async function main() {
  // await clearDatabase();
  await seedDatabase();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
