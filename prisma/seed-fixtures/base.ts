import type { Fixture } from "../seed-helpers/types";

export const baseFixture: Fixture = {
  accounts: [
    {
      clerkUserId: "clerk_user_1",
    },
    {
      clerkUserId: "clerk_user_2",
    },
  ],

  afterSeed: async (_prisma) => {
    console.log("🎉 Base seeding completed!");
  },

  users: [
    {
      email: "test@example.com",
      name: "Test User",
    },
    {
      email: "admin@example.com",
      name: "Admin User",
    },
    {
      email: "jane@example.com",
      name: "Jane Doe",
    },
  ],
};
