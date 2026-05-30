import { NextRequest } from "next/server";
import generateTextStream from "@/lib/openai/generate-text-stream";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid messages" }),
        { status: 400 },
      );
    }

    const systemMessage = messages.find((msg) => msg.role === "system");
    const instructions =
      systemMessage?.content || "You are a helpful AI Tutor.";

    const prompt = messages
      .filter((msg) => msg.role !== "system")
      .map((msg) => msg.content)
      .join("\n\n");

    const textStream = generateTextStream({ instructions, prompt });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const delta of textStream) {
            controller.enqueue(`data: ${JSON.stringify(delta)}\n\n`);
          }
          controller.close();
        } catch (error) {
          controller.error(error);
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
