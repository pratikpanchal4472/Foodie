import Prisma, * as PrismaAll from "@prisma/client";
import * as fs from "fs";

const PrismaClient = Prisma?.PrismaClient || PrismaAll?.PrismaClient;
const prisma = new PrismaClient();

let restaurants = JSON.parse(
  fs.readFileSync("./prisma/restaurants.json").toString()
);

async function main() {
  for (const r of restaurants) {
    const rst = await prisma.restaurant.create({
      data: r,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
