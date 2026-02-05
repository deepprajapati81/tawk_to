"use client";

import { ReactNode } from "react";

interface InlineCodeProps {
  children: ReactNode;
  className?: string;
  primaryColor?: string;
}

export const InlineCode = ({ 
  children, 
  className = "",
  primaryColor = "#03a84e" 
}: InlineCodeProps) => {
  return (
    <code
      className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-mono ${className}`}
      style={{
        backgroundColor: `${primaryColor}10`,
        color: primaryColor,
        border: `1px solid ${primaryColor}30`,
        // fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      }}
    >
      {children}
    </code>
  );
};
