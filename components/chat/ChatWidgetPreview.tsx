"use client";
import { Card } from "@/components/ui/card";
import { Input } from "../ui/input";
import { useMemo, useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Field, Form, Formik } from "formik";
import { ChatWidgetPreviewProps } from "@/types/chatbot";

export const ChatWidgetPreview = ({ config }: ChatWidgetPreviewProps) => {
  const { title, color, message, suggestions, fontFamily } = config;
  const [inputMessage, setInputMessage] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const textColor = useMemo(() => {
    try {
      const c = (color || "").replace("#", "");
      const bigint = parseInt(
        c.length === 3
          ? c
              .split("")
              .map((ch) => ch + ch)
              .join("")
          : c,
        16,
      );
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      return luminance > 0.6 ? "#000" : "#fff";
    } catch (e) {
      return "#fff";
    }
  }, [color]);
  function tint(hex: string, a: number) {
    try {
      const c = hex.replace("#", "");
      const full =
        c.length === 3
          ? c
              .split("")
              .map((ch) => ch + ch)
              .join("")
          : c;
      const bigint = parseInt(full, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    } catch (e) {
      return `rgba(0,0,0,${a})`;
    }
  }
  const footerBg = tint(color, 0.12);
  const inputBg = "#fff";
  const inputBorder = "rgba(0,0,0,0.06)";

  // Auto-scroll to bottom when new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [inputMessage]);

  return (
    <Card
      className={` xl:w-[80%] md:w-[70%]  w-full max-w-lg h-130 rounded-xl flex flex-col overflow-x-hidden shadow-lg gap-0 py-0  `}
      style={{
        fontFamily: fontFamily,
        transition: "background-color 200ms ease, color 300ms ease",
      }}
    >
      {" "}
      {/* for font family*/}
      <div
        className="flex items-center px-4 py-3 "
        style={{ backgroundColor: color, color: textColor }}
      >
        <span className="text-xl">‹</span>
        <p className="text-lg font-semibold px-2">{title}</p>
      </div>
      <div className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
        <div
          className="w-fit px-4 py-2.5 rounded-2xl text-sm wrap-break-word break-all whitespace-pre-wrap shadow-sm message-fadeIn"
          style={{ backgroundColor: color, color: textColor }}
        >
          {message}
        </div>

        <div className="flex flex-col items-end space-y-2">
          {suggestions
            ?.filter((m) => m.trim().length > 0)
            .map((s, i) => (
              <div
                key={i}
                className="w-fit px-4 py-2.5 rounded-2xl text-sm  
                whitespace-pre-wrap 
              wrap-break-word
              wrap:anywhere shadow-sm message-fadeIn"
                style={{
                  backgroundColor: color,
                  color: textColor,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {s}
              </div>
            ))}
        </div>
      <div className="flex flex-col items-end space-y-2">
  {inputMessage &&
    inputMessage
      .filter((m) => m.trim().length > 0)
      .map((m: string, index: number) => (
        <div
          key={index}
          className="text-xs max-w-[85%] message-fadeIn"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div
            className="
              w-fit 
              max-w-full 
              px-4 py-2.5 
              rounded-2xl 
              text-sm 
              whitespace-pre-wrap 
              wrap-break-word
              wrap:anywhere
              shadow-sm 
              message-fadeIn
            "
            style={{ backgroundColor: color, color: textColor }}
          >
            <p className=" wrap-break-word wrap:anywhere">
              {m}
            </p>
          </div>
        </div>
      ))}
</div>

        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div
        style={{
          borderTop: "1px solid rgba(0,0,0,0.06)",
          background: footerBg,
        }}
        className="p-3 flex gap-2 items-center"
      >
        <Formik
          initialValues={{ message: "" }}
          onSubmit={(values, { resetForm }) => {
            if (!values.message.trim()) return;

            setIsSending(true);

            setTimeout(() => {
              setInputMessage((prev) => [...prev, values.message]);
              setIsSending(false);
              resetForm();
            }, 300);
          }}
        >
          {() => (
            <Form className="flex gap-2 items-center w-full">
              <Field
                as={Input}
                name="message"
                className="flex-1 p-2.5 rounded-xl transition-all duration-200 focus:ring-2"
                placeholder="Type your message..."
                style={{
                  border: `1px solid ${inputBorder}`,
                  background: inputBg,
                  color: textColor === "#000" ? "#111" : "#222",
                  outline: "none",
                }}
              />

              <Button
                type="submit"
                disabled={isSending}
                className={`transition-all duration-200 ${isSending ? "animate-pulse scale-95" : "hover:scale-105"}`}
                style={{
                  background: color,
                  color: textColor,
                  padding: "10px 16px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {isSending ? "..." : "Send"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Card>
  );
};
