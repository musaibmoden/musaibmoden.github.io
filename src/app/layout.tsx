import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SoundProvider } from "@/components/SoundManager";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Musaib Sajjad | Portfolio",
  description: "A terminal-themed portfolio showcasing my technical and design skills",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable}`}>
        <SoundProvider>
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
