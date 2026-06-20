// src/features/identity/api/user.test.ts
import { beforeEach, describe, expect, it } from "vitest";

// Use the global prisma that the test setup provides
// (it's already typed and wrapped in transactional testing)
import "@/test/setup/prisma"; // ensure setup runs

describe("User model (user_data table)", () => {
  beforeEach(async () => {
    // The setup already handles transactions, but you can still clean up if needed
    await globalThis.prisma?.user.deleteMany({});
  });

  it("creates a user successfully", async () => {
    const user = await globalThis.prisma?.user.create({
      data: {
        email: "malcolm@example.com",
        name: "Malcolm Fein",
      },
    });

    expect(user).toMatchObject({
      email: "malcolm@example.com",
      id: expect.any(String),
      name: "Malcolm Fein",
    });
  });

  it("enforces unique email constraint", async () => {
    await globalThis.prisma?.user.create({
      data: { email: "duplicate@example.com", name: "Test User" },
    });

    await expect(
      globalThis.prisma?.user.create({
        data: { email: "duplicate@example.com", name: "Another User" },
      }),
    ).rejects.toThrow(/Unique constraint failed/);
  });
});
