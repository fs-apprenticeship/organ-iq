import { NextRequest } from "next/server";

import generateTextStream from "@/lib/openai/generate-text-stream";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const lastUserMessage = messages[messages.length - 1]?.content || "";

    const instructions = `You are AVA, a friendly, patient, and knowledgeable Organic Chemistry AI Tutor.
    Help students understand concepts clearly and encouragingly.`;

    // Call the generator and convert it to a stream Response
    const stream = generateTextStream({
      instructions,
      prompt: lastUserMessage,
    });

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              if (chunk) {
                controller.enqueue(`data: ${JSON.stringify(chunk)}\n\n`);
              }
            }
            controller.close();
          } catch (error) {
            console.error("Stream error:", error);
            controller.error(error);
          }
        },
      }),
      {
        headers: {
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          "Content-Type": "text/event-stream",
        },
      },
    );
  } catch (error) {
    console.error("AI Chat Error:", error);
    return new Response("Sorry, I'm having trouble responding right now.", {
      status: 500,
    });
  }
}
