// types/chatbot.ts
export type ChatbotConfig = {
  title: string;
  color: string;
  message: string;
  suggestions: string[];
  fontFamily: string;
};

export type ChatWidgetPreviewProps = {
  config: {
    title: string;
    color: string;
    message: string;
    suggestions: string[];
    fontFamily: string;
  };
};
export type ChatbotFormProps = {
  initialValues: ChatbotConfig;
  onChange: (values: Partial<ChatbotConfig>) => void;
  setId: React.Dispatch<React.SetStateAction<string>>;
};
