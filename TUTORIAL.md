# Adding AI Chat (AI Tutor) to Your Next.js Application

This guide explains how we added a fully functional **streaming AI chatbot** to the Organ IQ project.

---

## Prerequisites

- Next.js project using the App Router
- OpenAI API key
- `openai` package installed (`npm install openai`)

---

## Step 1: Add OpenAI API Key

Create or update `.env.local`:

```env
OPENAI_API_KEY=sk-proj-your-key-here
```

Restart your dev server after adding the key.

## Step 2: Create the Text Streaming Helper

File: src/lib/openai/generate-text-stream.ts

```javascript
import OpenAI from "openai";

export default async function* generateTextStream({
  instructions,
  prompt,
}: {
  instructions: string;
  prompt: string;
}) {
  const client = new OpenAI();

  const stream = client.responses.stream({
    model: "gpt-4o-2024-08-06",
    input: [
      { content: instructions, role: "developer" },
      { content: prompt, role: "user" },
    ],
  });

  for await (const event of stream) {
    if (event.type === "response.output_text.delta") {
      yield event.delta;
    }
  }
}
```

## Step 3: Create the API Route

File: src/app/api/chat/route.ts

```typescript
import { NextRequest } from "next/server";
import generateTextStream from "@/lib/openai/generate-text-stream";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Missing messages" }), {
        status: 400,
      });
    }

    const systemMessage = messages.find((m: any) => m.role === "system");
    const instructions =
      systemMessage?.content || "You are a helpful AI Tutor.";

    const prompt = messages
      .filter((m: any) => m.role !== "system")
      .map((m: any) => m.content)
      .join("\n\n");

    const textStream = generateTextStream({ instructions, prompt });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const delta of textStream) {
            controller.enqueue(`data: ${JSON.stringify(delta)}\n\n`);
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
```

## Step 4: Create the AI Tutor Component

File: src/features/game/components/ai-tutor.tsx (or src/components/ai-tutor.tsx)

Use the full component we built (with streaming, markdown, code blocks, etc.).

## Step 5: Use the Component in Your Page

```javascript
import AITutor from "@/features/game/components/ai-tutor";

export default function GamePage() {
  return (
    <div>
      {/* Your existing UI */}

      <AITutor
        systemPrompt="You are an expert AI Tutor for Organ IQ. Help users understand biology, anatomy, and medical concepts clearly."
        height="620px"
      />
    </div>
  );
}
```

## Required Packages

```bash
npm install react-markdown remark-gfm rehype-raw react-syntax-highlighter
```
