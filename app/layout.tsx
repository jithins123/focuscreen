import type { Metadata } from "next";
import "./globals.css";

const title = "Focuscreen";
const description = "Set your current goal, choose three priorities, run a focus timer, and create a calm workspace with inspiring backgrounds and YouTube focus music.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Focuscreen",
  keywords: ["focus timer", "daily goals", "productivity", "focus dashboard", "Pomodoro timer"],
  authors: [{ name: "Reprompting Project", url: "https://repromptingproject.com" }],
  creator: "Reprompting Project",
  publisher: "Reprompting Project",
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Focuscreen",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
