// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import ClientRoot from "@/components/ClientRoot";

export const metadata: Metadata = {
  title: "My Portfolio - Affan",
  description: "This website shows my skills showcase.",
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
      </body>
    </html>
  );
}
