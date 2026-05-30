"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "@/features/game/components/codeblock";
import requestStream from "@/lib/stream/request-stream";

/* eslint-disable security/detect-object-injection */

interface Message {
  content: string;
  role: "user" | "assistant";
}

interface AITutorProps {
  systemPrompt?: string;
  height?: string;
}

export default function AITutor({
  systemPrompt = "You are a helpful and knowledgeable AI Tutor.",
  height = "620px",
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

  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { content: trimmed, role: "user" };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { content: "", role: "assistant" }]);

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

                setMessages((prev) => [
                  ...prev.slice(0, -1),
                  { content: assistantResponse, role: "assistant" },
                ]);
              } catch {
                assistantResponse += raw;
                setMessages((prev) => [
                  ...prev.slice(0, -1),
                  { content: assistantResponse, role: "assistant" },
                ]);
              }
            }
          }
        },
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              { role: "system", content: systemPrompt },
              ...newMessages.map((m) => ({ role: m.role, content: m.content })),
            ],
          }),
        },
      );
    } catch (error: unknown) {
      console.error("Chat error:", error);
      const message =
        error instanceof Error ? error.message : "Failed to connect to AI";
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { content: `Error: ${message}`, role: "assistant" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
              Ask me anything...
              <br />
              I&apos;m here to help you learn.
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
                <ReactMarkdown components={{ code: CodeBlock }}>
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
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-3 bottom-3 px-5 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-xs font-medium rounded-lg transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
