// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import ClientRoot from "@/components/ClientRoot";
import ChatWidget from "@/assistant_dev/chat/ChatWidget";

export const metadata: Metadata = {
  title: "Affan Khan - Portfolio | Powered by Affonix",
  description: "Explore Affan's AI-powered portfolio featuring projects, skills, and journey. Enhanced with Affonix - an autonomous portfolio intelligence system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Manual font loading */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap"
        />
      </head>
      <body className="antialiased font-sans">
        <ClientRoot>{children}</ClientRoot>
        <ChatWidget />
      </body>
    </html>
  );
}
