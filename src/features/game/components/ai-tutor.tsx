"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import CodeBlock from "@/features/game/components/codeblock";
import requestStream from "@/lib/stream/request-stream";

interface Message {
  content: string;
  role: "user" | "assistant";
}

interface Question {
  id: number;
  formula: string;
  classification: string;
  difficulty: string;
  choices?: Array<{ formula: string; correct: boolean }>;
}

type MessageRole = "system" | "user" | "assistant";

interface AITutorProps {
  systemPrompt?: string;
  height?: string;
  currentQuestion?: Question | null;
  knownAnswer?: string | null;
  extraContext?: string;
}

export default function AITutor({
  systemPrompt = "You are an expert organic chemistry tutor for an educational game. Be clear, encouraging, and accurate.",
  height = "520px",
  currentQuestion,
  knownAnswer = null,
  extraContext = "",
}: AITutorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoGrow = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 140)}px`;
    }
  }, []);

  const getHelpPrompt = useCallback((): string => {
    if (!currentQuestion?.formula) return "No question available.";

    let prompt = `You are an expert organic chemistry tutor for an educational game.
Reaction shown: **${currentQuestion.formula}**`;

    if (knownAnswer) {
      prompt += `\n\n(Note for you: The correct missing reagent/condition is ${knownAnswer})`;
    }

    prompt += `
Analyze the reaction and respond in this **exact structure**:

**This is a [Reaction Type] reaction [specifically ... if applicable].**
**The missing compound/condition is:**  
**${knownAnswer || "[Answer]"}**

**So the completed reaction is:**  
**CH₃CH₂OH →[H₂SO₄][Δ] CH₂=CH₂ + H₂O**

**Where:**
• Ethanol becomes Ethene
• Water is the other product

**Using:**
• ${knownAnswer || "[Reagent]"}
• Heat / other conditions

---
**What's Happening?**
[Simple, clear, student-friendly mechanistic explanation. Use plain text for formulas when possible (e.g. CH3CH2OH, H2SO4, CH2=CH2).]

Rules:
- Always be accurate.
- Mention named reactions when relevant.
- Keep formulas readable in plain text when possible.
- Keep it engaging and educational.`;

    if (extraContext) {
      prompt += `\n\nAdditional context: ${extraContext}`;
    }

    return prompt;
  }, [currentQuestion, knownAnswer, extraContext]);

  const streamResponse = async (
    messagesToSend: Array<{ role: MessageRole; content: string }>,
  ) => {
    let assistantResponse = "";
    let buffer = "";

    try {
      await requestStream(
        "/api/chat",
        async (chunk: string) => {
          buffer += chunk;
          const lines = buffer.split("\n");
          buffer = lines[lines.length - 1];

          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            if (line.startsWith("data: ")) {
              const raw = line.slice(6).trim();
              if (!raw) continue;

              try {
                const textDelta = JSON.parse(raw);
                assistantResponse += textDelta;
              } catch {
                assistantResponse += raw;
              }

              setMessages((prev) => [
                ...prev.slice(0, -1),
                { content: assistantResponse, role: "assistant" },
              ]);
            }
          }
        },
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: messagesToSend }),
        },
      );
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          content: "Sorry, I couldn't connect. Please try again.",
          role: "assistant",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendHelp = async () => {
    if (!currentQuestion || isLoading) return;

    setMessages((prev) => [
      ...prev,
      { content: "Help me with this reaction!", role: "user" },
      { content: "", role: "assistant" },
    ]);
    setIsLoading(true);

    const helpPrompt = getHelpPrompt();
    await streamResponse([
      { role: "system", content: systemPrompt },
      { role: "user", content: helpPrompt },
    ]);
  };

  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { content: trimmed, role: "user" };
    const newMessages = [...messages, userMessage];

    setMessages([...newMessages, { content: "", role: "assistant" }]);
    setInputValue("");
    setIsLoading(true);

    // eslint-disable-next-line security/detect-object-injection
    const messagesForAI: Array<{ role: MessageRole; content: string }> = [
      { role: "system", content: systemPrompt },
      ...newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    await streamResponse(messagesForAI);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-clear chat when question changes
  useEffect(() => {
    setMessages([]);
  }, [currentQuestion?.id]);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    autoGrow();
  }, [inputValue, autoGrow]);

  return (
    <div
      className="w-full max-w-sm flex flex-col rounded-xl border border-gray-700 bg-[#111827] overflow-hidden"
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      <div className="px-4 py-3 border-b border-gray-700 bg-[#0d1117]">
        <span className="text-[10px] uppercase tracking-widest text-green-400">
          AI TUTOR
        </span>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-4"
        style={{ height }}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <p className="text-gray-500 text-sm">
              Stuck on the reaction?
              <br />
              Click <strong>Help!</strong>
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-green-600 text-white"
                    : "bg-[#1f2937] text-gray-200 border border-gray-700"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{ code: CodeBlock }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1f2937] px-4 py-2 rounded-xl text-gray-400 text-sm">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-4 border-t border-gray-700 bg-[#0d1117]">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            className="w-full resize-y bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-green-500 min-h-[52px] max-h-[140px]"
            rows={1}
          />

          <div className="absolute right-3 bottom-3 flex gap-2">
            <button
              onClick={sendHelp}
              disabled={!currentQuestion || isLoading}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-700 text-xs font-medium rounded-lg transition-colors"
            >
              Help!
            </button>

            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-5 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-xs font-medium rounded-lg transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
