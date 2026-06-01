import { beforeEach, describe, expect, it, vi } from "vitest";
import { AccountFactory } from "@/test/factories/account-factory";

const { mockAuth } = vi.hoisted(() => ({
  mockAuth: vi.fn(),
}));

const { mockRedirect } = vi.hoisted(() => ({
  mockRedirect: vi.fn(),
}));

vi.mock("@clerk/nextjs", () => ({
  UserButton: () => <div>user button</div>,
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

import Home from "./page";

describe("Home page", () => {
  beforeEach(() => {
    mockAuth.mockReset();
    mockRedirect.mockReset();
  });

  it("redirects to /sign-in when signed out", async () => {
    mockAuth.mockResolvedValue({ userId: null });

    await Home();

    expect(mockRedirect).toHaveBeenCalledWith("/sign-in");
  });

  it("redirects to /game when signed in", async () => {
    const account = await AccountFactory.create();
    mockAuth.mockResolvedValue({ userId: account.clerkUserId });

    await Home();

    expect(mockRedirect).toHaveBeenCalledWith("/game");
  });
});
