import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./components/themeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Custom Card Creator",
  description: "Customizable avatar and theme!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex crt-screen bg-radial from-[var(--secondary)] to-black/20 items-center justify-center h-screen md:max-h-screen md:w-screen overflow-hidden">
          <div className="fixed bottom-3 lg:bottom-40">
            <ThemeToggle />
          </div>
          <main className="max-w-3xl border-t border-b md:border border-[var(--accent-text)] border-dotted w-full shadow-[15px_15px_15px_var(--primary-text)]/40">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
