"use client";

import { useState } from "react";


import { ChatWidgetPreview } from "@/components/chat/ChatWidgetPreview";
import { ChatbotForm } from "@/components/chat/ChatbotForm";
import { ChatbotConfig } from "@/types/chatbot";

import { Button } from "@/components/ui/button";

const initialConfig: ChatbotConfig = {
  title: "Codelinks",
  color: "#03a84e",
  message: "Hi 👋 How can I help you?",
  suggestions: ["I have a question", "Tell me more"],
  userMessages:["this massage is from user"]
};

export default function ChatbotBuilderPage() {


  const [config, setConfig] = useState<ChatbotConfig>(initialConfig);
 

  const handleChange = (values: Partial<ChatbotConfig>) => {
    setConfig((prev) => ({ ...prev, ...values }));
  };



  return (
    <div className="w-full min-h-screen flex">
    

      <div className="w-[30%] min-h-screen bg-gray-50 lg:items-center lg:justify-center hidden lg:flex lg:flex-col lg:space-y-13 ">
        <div className="flex  justify-center flex-col items-center space-y-3">
          <img src="./Logo.png" alt="logo" className="w-14 h-14" />

          <div className="gap-y-3 border border-gray-500 rounded-sm px-7 py-3">
            <h1 className="text-[23px]/[41px] font-bold">Live Chat</h1>
            <h3>Add live chat to your website</h3>
          </div>
        </div>

        <div className=" w-[70%] space-y-5">
          <h1 className="text-[23px]/[41px] font-bold text-start">
            Monitor and chat with the visitors on your website
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
            nihil sequi, error aspernatur eaque unde consectetur laborum atque
            qui eveniet soluta id explicabo sed rem optio minus? At, debitis
            odio.
          </p>
          <p>
            {" "}
            Eligendi, dignissimos, ipsam quaerat fugit odio possimus ea dolorum
            atque itaque libero consequuntur fuga. Incidunt repellendus
            laudantium reiciendis magnam corrupti perspiciatis veritatis porro
            repellat maiores libero, aut vitae itaque. Voluptatem!
          </p>
          <Button type="button" variant="outline" className="py-2 px-5">
            Chat with us
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-screen bg-gray-100 px-4 gap-x-2.5 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-5 ">
          <div className="md:col-span-2 flex justify-center flex-col">
            <h1 className=" font-bold text-[23px]/[41px]">
              Custom your widget here
            </h1>
            <ChatbotForm

              initialValues={config}
              onChange={handleChange}
             

            />
          </div>

          <div className="flex justify-center">
            <ChatWidgetPreview config={config} />
          </div>
        </div>
      </div>
    </div>
  );
}
