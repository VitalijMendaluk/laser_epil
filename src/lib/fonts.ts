import { Cormorant_Garamond, Manrope, Noto_Sans_Georgian, Noto_Serif_Georgian } from "next/font/google";

export const display = Cormorant_Garamond({ subsets: ["latin", "cyrillic"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-display-latin", display: "swap" });
export const sans = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-sans-latin", display: "swap" });
export const displayKa = Noto_Serif_Georgian({ subsets: ["georgian"], weight: ["300", "400", "500"], variable: "--font-display-ka", display: "swap" });
export const sansKa = Noto_Sans_Georgian({ subsets: ["georgian"], variable: "--font-sans-ka", display: "swap" });

export const fontVariables = [display.variable, sans.variable, displayKa.variable, sansKa.variable].join(" ");
