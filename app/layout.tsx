import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://focuscreen.vercel.app";
const title = "Focuscreen";
const description = "Plan your current goal, organise daily tasks, and stay productive with a custom focus timer, calming backgrounds, and optional focus music.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Focuscreen",
  category: "productivity",
  keywords: ["focus timer", "daily goal planner", "online Pomodoro timer", "productivity dashboard", "daily task list", "focus music", "deep work timer", "fullscreen focus app"],
  authors: [{ name: "Reprompting Project", url: "https://repromptingproject.com" }],
  creator: "Reprompting Project",
  publisher: "Reprompting Project",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Focuscreen - Daily Goal and Focus Timer",
    description,
    url: "/",
    type: "website",
    siteName: "Focuscreen",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Focuscreen - Daily Goal and Focus Timer",
    description,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Focuscreen",
  url: siteUrl,
  description,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  isAccessibleForFree: true,
  creator: { "@type": "Organization", name: "Reprompting Project", url: "https://repromptingproject.com" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}