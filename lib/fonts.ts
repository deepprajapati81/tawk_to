import { Inter,Roboto,Poppins,Montserrat ,JetBrains_Mono,Fira_Code} from "next/font/google";

export const inter = Inter(
    {
        subsets:["latin","cyrillic"],
        variable:"--font-inter"
    }
)
export const roboto = Roboto(
    {
        subsets:["latin"],
        weight: ["400", "700"],
        variable:'--font-roboto'
    }
)
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-montserrat",
});
export const jetBrainsMono = JetBrains_Mono({
    subsets:["latin"],
    weight:['400','600'],
    variable:"--font-JetBrainsMono"
})
export const firaCode = Fira_Code({
    subsets:["latin" ,"cyrillic"],
    weight:['400','600'],
    variable:"--font-FiraCode"
})