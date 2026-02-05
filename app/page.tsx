"use client";

import { useMemo, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { ChatbotForm } from "@/components/chat/ChatbotForm";
import { ChatbotConfig } from "@/types/chatbot";
import { WidgetSkeletonShimmer } from "@/components/widget/WidgetSkeleton";
import { CodeBlockSkeletonShimmer } from "@/components/codeblock/code-block-skeleton";

// Dynamic imports with loading states
const ChatWidgetPreview = dynamic(
  () => import("@/components/chat/ChatWidgetPreview").then((mod) => ({ default: mod.ChatWidgetPreview })),
  {
    loading: () => <WidgetSkeletonShimmer />,
    ssr: false,
  }
);

const CodeBlock = dynamic(
  () => import("@/components/codeblock/code-block").then((mod) => ({ default: mod.CodeBlock })),
  {
    loading: () => <CodeBlockSkeletonShimmer theme="light" />,
    ssr: true,
  }
);

const initialConfig: ChatbotConfig = {
  title: "Codelinks",
  color: "#03a84e",
  message: "Hi 👋 How can I help you?",
  suggestions: ["I have a question", "Tell me more"],
  fontFamily: "",
};

export default function ChatbotBuilderPage() {
  const [config, setConfig] = useState<ChatbotConfig>(initialConfig);
  const [id, setId] = useState<string>("");

  const snippet = useMemo(() => {
    if (!id) return "";
    
    console.log("id of widget" + id);
    if (typeof window !== "undefined") {
      const absOrigin =
        window.location.origin ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        "http://localhost:3000";
      return `<script src="${absOrigin}/api/loader/${id}" async></script>`;
    }
    return "";
  }, [id]);

  const handleChange = (values: Partial<ChatbotConfig>) => {
    setConfig((prev) => ({ ...prev, ...values }));
  };

  return (
   
    <div className="w-full min-h-screen bg-gray-100 md:px-10 px-7 py-10">

    <div className="max-w-6xl mx-auto flex flex-col gap-10">

      <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
        


        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <h1 className="font-bold text-[23px]">
            Customize your widget here
          </h1>

          <ChatbotForm
            initialValues={config}
            onChange={handleChange}
            setId={setId}
          />
        </div>

        <div className="w-full lg:w-1/2 flex justify-center ">
          <ChatWidgetPreview config={config} />
        </div>

      </div>

    <div className="w-full">  {id && (
        <div className="space-y-4">
          <h2 className="text-[23px] font-bold">Your Widget Code</h2>
          <CodeBlock 
            code={snippet} 
            language="html"
            title="Copy and paste this code snippet into your website's HTML, just before the closing </body> tag."
            theme="light"
            primaryColor={config.color}
          />
        </div>
      )}</div>
    </div>
  </div>


  );
}

