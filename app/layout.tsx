import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phlenjo | Detty December Planner",
  description: "An app-like Lagos holiday planner for nights, beaches, chow, culture, and squad trips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
