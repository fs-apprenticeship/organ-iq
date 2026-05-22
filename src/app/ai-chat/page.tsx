"use client";

import React, { useCallback, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

import CodeBlock from "@/components/ui/codeblock";
import requestStream from "@/lib/stream/request-stream";

interface Conversation {
  content: string;
  role: string;
}

export default function AIChat() {
  const [value, setValue] = React.useState<string>("");
  const [conversation, setConversation] = React.useState<Conversation[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);

  const autoGrow = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    autoGrow();
  };

  const sendMessage = async (message: string) => {
    const chatHistory = [...conversation, { content: message, role: "user" }];

    setValue("");
    setConversation([...chatHistory, { content: "", role: "assistant" }]);

    setTimeout(() => {
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    }, 10);

    let assistantMessage = "";
    let buffer = "";

    const request = new Request(`/api/ai-chat`, {
      body: JSON.stringify({ messages: chatHistory }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    requestStream(request, async (chunk: string) => {
      buffer += chunk;
      const lines = buffer.split("\n");
      buffer = lines[lines.length - 1];

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines.at(i) ?? "";
        if (line.startsWith("data: ")) {
          const raw = line.slice(6).trim();
          if (!raw) continue;

          try {
            const textDelta = JSON.parse(raw);
            assistantMessage += textDelta;

            setConversation((prev) => [
              ...prev.slice(0, -1),
              { content: assistantMessage, role: "assistant" },
            ]);
          } catch (error) {
            console.error("Failed to parse text delta:", error);
          }
        }
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && value.trim()) {
      e.preventDefault();
      sendMessage(value.trim());
    }
  };

  const handleSend = () => {
    if (value.trim()) sendMessage(value.trim());
  };

  useEffect(() => {
    autoGrow();
  }, [value, autoGrow]);

  useEffect(() => {
    if (lastUserMessageRef.current && chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTo({
        behavior: "smooth",
        top: lastUserMessageRef.current.offsetTop - 100,
      });
    }
  }, [conversation]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Hi there, I am AVA</h1>
          <p className="text-zinc-400">Your Organic Chemistry AI Tutor</p>
        </div>

        {/* Chat Area */}
        <div
          className="bg-zinc-900 rounded-2xl p-6 mb-6 min-h-[60vh] max-h-[70vh] overflow-y-auto border border-zinc-800"
          ref={chatContainerRef}
        >
          {conversation.length === 0 && (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <p className="text-zinc-500 mb-2">
                  Ask me anything about organic chemistry
                </p>
                <p className="text-sm text-zinc-600">
                  Reactions, mechanisms, nomenclature, spectroscopy...
                </p>
              </div>
            </div>
          )}

          {conversation.map((item, index) => {
            const isUser = item.role === "user";

            return (
              <div
                className={`mb-6 flex ${isUser ? "justify-end" : "justify-start"}`}
                key={index}
              >
                <div
                  className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}
                >
                  <div
                    className={`text-xs mb-1.5 px-3 ${isUser ? "text-right text-emerald-400" : "text-violet-400"}`}
                  >
                    {isUser ? "You" : "AVA"}
                  </div>

                  <div
                    className={`rounded-2xl px-5 py-4 ${
                      isUser
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-800 border border-zinc-700"
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        code: CodeBlock,
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-5 mb-3">{children}</ol>
                        ),
                        p: ({ children }) => (
                          <p className="mb-3 last:mb-0">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-5 mb-3">{children}</ul>
                        ),
                      }}
                    >
                      {item.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="flex gap-3">
            <textarea
              className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-5 py-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 resize-y min-h-14 max-h-52"
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here... (Press Enter to send, Shift + Enter for new line)"
              ref={textareaRef}
              value={value}
            />
            <button
              className="bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 px-8 rounded-xl font-medium transition-colors self-end mb-1 whitespace-nowrap"
              disabled={!value.trim()}
              onClick={handleSend}
            >
              Send
            </button>
          </div>

          <p className="text-center text-zinc-500 text-xs mt-3">
            You can paste multi-line structures or reactions. AVA will
            understand the formatting.
          </p>
        </div>
      </div>
    </div>
  );
}
