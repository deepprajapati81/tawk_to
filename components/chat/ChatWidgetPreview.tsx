"use client";
import { Card } from "@/components/ui/card";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Field, Form, Formik } from "formik";
import { ChatbotConfig } from "@/types/chatbot";

type Props = {
  config: {
    title: string;
    color: string;
    message: string;
    suggestions: string[];
    userMessages: string[];
  };
};

export const ChatWidgetPreview = ({ config }: Props) => {
  const { title, color, message, suggestions, userMessages } = config;
  const [inputMessage, setInputMessage] = useState<string[]>([]);

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

  return (
    <Card className="w-full max-w-lg h-130 rounded-xl flex flex-col overflow-x-hidden shadow-lg gap-0 py-0">
      <div
        className="flex items-center px-4 py-3 text-white"
        style={{ backgroundColor: color }}
      >
        <span className="text-xl">‹</span>
        <p className="text-lg font-semibold px-2">{title}</p>
      </div>

      <div className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
        <div
          className="w-fit px-3 py-2 rounded-md text-white text-sm"
          style={{ backgroundColor: color }}
        >
          {message}
        </div>

        <div className="flex flex-col items-end space-y-2">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="w-fit px-3 py-2 rounded-md text-white text-sm"
              style={{ backgroundColor: color }}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end space-y-2">
          {inputMessage &&
            inputMessage.map((m: string, index: number) => (
              <div key={index} className="text-end text-xs">
                <div
                  key={index}
                  className="w-fit px-3 py-2 rounded-md text-white text-sm  wrap-break-word"
                  style={{ backgroundColor: color }}
                >
                  {m}
                </div>{" "}
                User
              </div>
            ))}
        </div>
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
            setInputMessage((prev) => [...prev, values.message]);

            resetForm();
          }}
        >
          {() => (
            <Form className="flex gap-2 items-center w-full">
              <Field
                as={Input}
                name="message"
                className="flex-1 p-2 rounded"
                placeholder="text here..."
                style={{
                  border: `1px solid ${inputBorder}`,
                  background: inputBg,
                  color: textColor === "#000" ? "#111" : "#222",
                }}
              />

              <Button
                type="submit"
                style={{
                  background: color,
                  color: textColor,
                  padding: "8px 12px",
                  borderRadius: 6,
                }}
              >
                Send
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Card>
  );
};
