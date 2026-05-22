import { beforeEach, describe, expect, it, vi } from "vitest";

import generateTextStream from "./generate-text-stream";

// Mock OpenAI
vi.mock("openai", () => {
  const mockStream = {
    [Symbol.asyncIterator]: async function* () {
      yield { choices: [{ delta: { content: "Hello! I'm AVA." } }] };
      yield {
        choices: [
          {
            delta: {
              content: " How can I help you with organic chemistry today?",
            },
          },
        ],
      };
    },
  };

  return {
    default: class MockOpenAI {
      chat = {
        completions: {
          create: vi.fn().mockResolvedValue(mockStream),
        },
      };
    },
  };
});

describe("generateTextStream", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests a response stream and yields text deltas", async () => {
    const generator = generateTextStream({
      instructions: "You are AVA",
      prompt: "Hello",
    });

    const chunks: string[] = [];
    for await (const chunk of generator) {
      chunks.push(chunk);
    }

    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks.join("")).toContain("AVA");
  });
});
