import { Post, Prisma, PrismaClient } from "@prisma/client";
import faker from "faker";

async function main() {
  const prisma = new PrismaClient();

  const datas: Prisma.Enumerable<Prisma.PostCreateManyInput> = [];

  for (let index = 0; index < 100; index++) {
    datas.push({
      body: faker.random.words(10),
      title: faker.random.word(),
      published: index < 50,
    });
  }

  await prisma.post.createMany({
    data: datas,
  });

  console.log(datas);

  console.log("seeded ");
}

main();
