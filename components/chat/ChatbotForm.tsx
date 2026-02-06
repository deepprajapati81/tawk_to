"use client";
import { fontOptions } from "@/lib/font-option";
import { Formik, Form, FieldArray } from "formik";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChatbotConfig } from "@/types/chatbot";
import { ChatbotFormProps } from "@/types/chatbot";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";
const fontClassMap: Record<string, string> = {
  inter: "font-inter",
  roboto: "font-roboto",
  poppins: "font-poppins",
  montserrat: "font-montserrat",
  jetBrainsMono: "font-JetBrainsMono",
  firaCode: "font-FiraCode",
};

export const ChatbotForm = ({
  initialValues,
  onChange,
  setId,
}: ChatbotFormProps) => {
  const handleSave = async () => {
    const res = await fetch("/api/widget", {
      method: "POST",
      body: JSON.stringify({
        color: initialValues.color,
        title: initialValues.title,
        fontFamily: initialValues.fontFamily,
      }),
    });

    const data = await res.json();

    setId(data.id);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        onChange(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="space-y-2">
            <label className="font-semibold">Title</label>
            <Input
              value={values.title}
              onChange={(e) => {
                setFieldValue("title", e.target.value);
                onChange({ ...values, title: e.target.value });
              }}
              placeholder="Enter chatbot name"
            />
          </div>

          <div className="space-y-3">
            <label className="font-semibold">Color</label>

            <div className="flex flex-wrap gap-3">
              {["#abb0ba", "#005eff", "#d42300", "#7866ff", "#03a84e"].map(
                (c) => (
                  <div
                    key={c}
                    onClick={() => {
                      setFieldValue("color", c);
                      onChange({ ...values, color: c });
                    }}
                    className="h-10 w-10 rounded cursor-pointer border"
                    style={{ backgroundColor: c }}
                  />
                ),
              )}

              <Input
                type="color"
                value={values.color}
                className="w-16 h-10 p-1"
                onInput={(e) => {
                  const color = (e.target as HTMLInputElement).value;

                  onChange({ color });
                }}
                onBlur={(e) => {
                  const color = (e.target as HTMLInputElement).value;
                  setFieldValue("color", color);
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-semibold">Welcome Message</label>
            <Textarea
              value={values.message}
              onChange={(e) => {
                setFieldValue("message", e.target.value);
                onChange({ ...values, message: e.target.value });
              }}
            />
          </div>

          <FieldArray name="suggestions">
            {({ push, remove }) => (
              <div className="space-y-3">
                <label className="font-semibold">Suggested Messages</label>

                {values.suggestions.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={s}
                      onChange={(e) => {
                        const next = [...values.suggestions];
                        next[i] = e.target.value;
                        setFieldValue("suggestions", next);
                        onChange({ ...values, suggestions: next });
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => remove(i)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}

                {values.suggestions.length < 4 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => push("")}
                  >
                    + Add suggestion
                  </Button>
                )}
              </div>
            )}
          </FieldArray>

          <Select
            value={values.fontFamily}
            onValueChange={(value) => {
              setFieldValue("fontFamily", value);

              onChange({ ...values, fontFamily: value });
            }}
            
          >
            <SelectTrigger className="w-60">
              {" "}
              <SelectValue placeholder="Select font family" />
            </SelectTrigger>
            <SelectContent className="  border-0 bg-gray-100">
              {fontOptions.map((font) => (
                <SelectItem
                  key={font.value}
                  value={font.value}
                  className={fontClassMap[font.value]}
                >
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-x-2">
            <Button
              type="submit"
              className="w-fit bg-black text-white"
              onClick={handleSave}
            >
              Generate Widget
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
