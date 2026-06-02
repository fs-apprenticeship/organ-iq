import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { UserButton } from "@clerk/nextjs";

import AppProvider from "@/app/provider";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description:
    "A reusable Next.js starter with Clerk, Prisma, Tailwind, and Vitest.",
  title: "Next.js Template",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground`}
      >
        <AppProvider>
          <div className="fixed top-4 right-12 z-50">
            <UserButton />
          </div>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
