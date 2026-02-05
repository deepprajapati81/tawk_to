"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "./button";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  theme?: "light" | "dark";
  primaryColor?: string;
  title?: string;
}

export const CodeBlock = ({
  code,
  language = "html",
  showLineNumbers = false,
  theme = "light",
  primaryColor = "#03a84e",
  title,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  // Custom theme that matches your primary color
  const customLightTheme = {
    ...vs,
    'pre[class*="language-"]': {
      ...vs['pre[class*="language-"]'],
      background: "#f8f9fa",
      padding: "1.5rem",
      margin: 0,
      borderRadius: "0.5rem",
      fontSize: "0.9rem",
      lineHeight: "1.6",
      overflow: "visible !important" as any,
      whiteSpace: "pre-wrap" as any,
    },
    'code[class*="language-"]': {
      ...vs['code[class*="language-"]'],
      background: "transparent",
      fontSize: "0.9rem",
      lineHeight: "1.6",
      color: "#2d3748",
    },
  };

  const customDarkTheme = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: "#1e293b",
      padding: "1.5rem",
      margin: 0,
      borderRadius: "0.5rem",
      fontSize: "0.9rem",
      lineHeight: "1.6",
      overflow: "visible !important" as any,
      whiteSpace: "pre-wrap" as any,
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: "transparent",
      fontSize: "0.9rem",
      lineHeight: "1.6",
    },
  };

  const selectedTheme = theme === "dark" ? customDarkTheme : customLightTheme;

  return (
    <div className="relative group code-block-wrapper">
      <div
        className="rounded-lg border overflow-hidden shadow-sm transition-shadow hover:shadow-md"
        style={{
          borderColor: theme === "dark" ? "#334155" : "#e5e7eb",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{
            background: theme === "dark" ? "#0f172a" : "#ffffff",
            borderColor: theme === "dark" ? "#334155" : "#e5e7eb",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full" style={{ background: primaryColor }} />
            </div>
            <span
              className="text-sm font-medium ml-3  md:block hidden"
              style={{
                color: theme === "dark" ? "#94a3b8" : "#64748b",
              }}
            >
              {title || `${language.toUpperCase()} Code`}
            </span>
          </div>

          <Button
            onClick={copyToClipboard}
            size="sm"
            variant="ghost"
            className="h-8 px-3 text-xs font-medium transition-all"
            style={{
              color: copied ? primaryColor : theme === "dark" ? "#94a3b8" : "#64748b",
            }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>

        {/* Code Content */}
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={selectedTheme}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            wrapLongLines={true}
            customStyle={{
              margin: 0,
              padding: "1.5rem",
              background: "transparent",
              fontSize: "0.9rem",
              lineHeight: "1.6",
              maxHeight: "none",
              overflow: "visible",
            }}
            codeTagProps={{
              style: {
                fontSize: "0.9rem",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Accent glow effect on hover */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at center, ${primaryColor}, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
    </div>
  );
};
