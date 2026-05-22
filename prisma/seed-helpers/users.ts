// prisma/seed-helpers/users.ts
import type { PrismaClient } from "@/generated/prisma/client";

import type { Fixture } from "./types";

export async function seedUsers(prisma: PrismaClient, users: Fixture["users"]) {
  if (!users?.length) return;

  let count = 0;
  for (const userData of users) {
    await prisma.user.upsert({
      create: {
        email: userData.email,
        name: userData.name,
      },
      update: {},
      where: { email: userData.email },
    });
    count++;
  }

  console.log(`✅ Seeded ${count} user(s) in user_data table`);
}
