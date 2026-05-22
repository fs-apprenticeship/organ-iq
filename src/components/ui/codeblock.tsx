"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  children?: React.ReactNode;
  className?: string;
  node?: unknown;
};

export default function CodeBlock({ children, className, node }: Props) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const inline = !node;
  const code = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!inline && match) {
    return (
      <div className="relative group">
        <button
          className="absolute right-3 top-3 px-3 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 
                     text-zinc-300 rounded border border-zinc-700 transition-colors z-10"
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        <SyntaxHighlighter
          customStyle={{
            borderRadius: "8px",
            margin: 0,
            padding: "16px",
          }}
          language={match[1]}
          style={oneDark}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
      {children}
    </code>
  );
}
