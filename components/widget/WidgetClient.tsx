"use client";
import { Formik, Form, Field } from "formik";
import { Button } from "../ui/button";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
export default function WidgetClient({
  initialColor,
  initialTitle,
  initialFontFamily
}: {
  initialColor?: string;
  initialTitle?: string;
  initialFontFamily?: string;
}) {
  const [color, setColor] = useState(initialColor || "#0ea5e9");
  const [title, setTitle] = useState(initialTitle || "chatbot");
  const [FontFamily,setFontFamily] = useState(initialFontFamily|| 'inter')
  const [message, setMessage] = useState<string[]>([]);

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

  useEffect(() => {
    function handler(e: MessageEvent) {
      if (!e.data || typeof e.data !== "object") return;

      if (e.data.type === "setTheme") {
        if (e.data.color) setColor(e.data.color);
        if (e.data.title) setTitle(e.data.title);
      }
    }

    window.addEventListener("message", handler);

    // ask parent for latest theme on mount
    window.parent?.postMessage({ type: "requestTheme" }, "*");

    return () => window.removeEventListener("message", handler);
  }, []);

  const panelBg =
    textColor === "#000" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.08)";

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


  const messageTextColor = "#000";
  const messageMetaColor = "#555";

  return (
    <div
      className="h-screen flex flex-col shadow-xl "
      style={{
        fontFamily:FontFamily,
        background: "#fff",
        // color: "#111",
        color: textColor,
        
      }}
    >
      <div
  className="fixed top-0 left-0 w-full z-20 flex items-center"
  style={{
    height: 56,
    padding: "10px",
    fontWeight: 700,
    background: color,
    color: textColor,
  }}
>
        <Button
          className="text-xl "
          style={{
            background: color,
            color: textColor,
            padding: "8px 12px",
            borderRadius: 6,
          }}
        >
          ‹
        </Button>
        <h1 className="text-lg text-start">{title}</h1>
      </div>
<div
  className="overflow-y-auto px-4 py-3 space-y-2"
  style={{
    background: panelBg,
    marginTop: 56,    
    marginBottom: 64, 
    height: "calc(100vh - 56px - 64px)",
  }}
>
        
        <div className="text-sm">
          {" "}
          <div
            className="w-fit px-3 py-2 rounded-md text-white text-sm  wrap-break-word"
            style={{ color: textColor, backgroundColor: color }}
          >
            Hello 👋
          </div>
          {/* admin */}
        </div>

        <div className="flex flex-col items-end space-y-1 ">
          {message &&
            message.map((m: string, index: number) => (
              <div key={index} className="text-end text-xs  ">
                <div
                  key={index}
                  className="w-fit px-3 py-2 rounded-md text-white text-sm wrap-normal"
                  style={{ backgroundColor: color,color: textColor, }}
                >
                  <p className="wrap-break-word">{m}</p>
                </div>{" "}
                {/* User */}
              </div>
            ))}
        </div>
      </div>
     <div
  className="fixed bottom-0 left-0 w-full z-20 p-2 flex gap-2 items-center"
  style={{
    height: 64,
    borderTop: "1px solid rgba(0,0,0,0.06)",
    background: footerBg,
  }}
>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={(values, { resetForm }) => {
            setMessage((prev) => [...prev, values.message]);

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
    </div>
  );
}
