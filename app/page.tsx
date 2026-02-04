"use client";

import { useEffect, useState } from "react";
import { Card,CardFooter, CardDescription, CardTitle, CardHeader ,CardContent } from "@/components/ui/card";
import { ChatWidgetPreview } from "@/components/chat/ChatWidgetPreview";
import { ChatbotForm } from "@/components/chat/ChatbotForm";
import { ChatbotConfig } from "@/types/chatbot";

import { Button } from "@/components/ui/button";

const initialConfig: ChatbotConfig = {
  title: "Codelinks",
  color: "#03a84e",
  message: "Hi 👋 How can I help you?",
  suggestions: ["I have a question", "Tell me more"],
  userMessages: ["this massage is from user"],
  fontFamily: "",
};

export default function ChatbotBuilderPage() {
  const [config, setConfig] = useState<ChatbotConfig>(initialConfig);
  const [id, setId] = useState<string>("");

  const [copied, setCopied] = useState(false);

  const [snippet, setSnippet] = useState("");

  useEffect(() => {
    console.log("id of widget" + id);
    try {
      if (typeof window !== "undefined") {
        const absOrigin =
          window.location.origin ||
          process.env.NEXT_PUBLIC_BASE_URL ||
          "http://localhost:3000";
        setSnippet(
          `<script src="${absOrigin}/api/loader/${id}" async></script>`,
        );
      }
    } catch (e) {}
  }, [id]);
  const handleChange = (values: Partial<ChatbotConfig>) => {
    setConfig((prev) => ({ ...prev, ...values }));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  return (
   
    <div className="w-full min-h-screen bg-gray-100 flex md:px-10">
  <div className="flex-1 px-6 py-10">
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

      {id && (
        <Card className="w-[50%]">
          <CardHeader>
            <CardTitle className="text-[23px] ">
              Copy to Clipboard
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="wrap-break-word text-[15px]   p-3 rounded">
              {snippet}
            </p>
          </CardContent>

          <CardFooter>
            <Button
              onClick={copyToClipboard}
              className=" bg-black text-white py-2 rounded hover:opacity-90 "
            >
              {copied ? "✅ Copied!" : "Copy Script"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  </div>
</div>

  );
}

