import OpenAI from "openai";

export default async function* generateTextStream({
  instructions,
  prompt,
}: {
  instructions: string;
  prompt: string;
}) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const stream = await openai.chat.completions.create({
    messages: [
      { content: instructions, role: "system" },
      { content: prompt, role: "user" },
    ],
    model: "gpt-4o-mini", // Use gpt-4o-mini for faster/cheaper testing
    stream: true,
    temperature: 0.7,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    if (content) {
      yield content;
    }
  }
}
