import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stillpoint â€” Daily Focus",
  description: "A calm, full-screen home for your daily intention and three priorities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
