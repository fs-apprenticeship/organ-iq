// prisma/seed-helpers/types.ts
import { PrismaClient } from "@/generated/prisma/client";

export type AccountSeed = {
  clerkUserId: string;
};

export type Fixture = {
  accounts?: readonly AccountSeed[];
  afterSeed?: (prisma: PrismaClient) => Promise<void>;
  users?: readonly UserSeed[];
};

type UserSeed = {
  email: string;
  name: string;
};
