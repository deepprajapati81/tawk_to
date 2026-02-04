import WidgetClient from "@/components/widget/WidgetClient";
type PageProps = {
  searchParams?: Promise<{
    color?: string;
    title?: string;
    fontFamily?: string;
  }>;
};

export default async function WidgetUI({ searchParams }: PageProps) {
  const params = await searchParams;
    console.log(params)
  const color = params?.color || "#0ea5e9";
  const title = params?.title || "chatbot";
const fontFamily = params?.fontFamily || "inter"; 
  return <WidgetClient initialColor={color} initialTitle={title} initialFontFamily = {fontFamily}/>;
}
