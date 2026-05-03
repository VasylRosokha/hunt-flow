import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HuntFlow — AI-Powered Job Application Tracker",
  description: "Track job applications, get AI-powered insights, and generate tailored cover letters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}