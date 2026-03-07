import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import argon2 from "argon2";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await argon2.hash("admin123");

  await prisma.user.upsert({
    where: { email: "admin@music.local" },
    update: {},
    create: {
      email: "admin@music.local",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("Admin créé avec succès");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
