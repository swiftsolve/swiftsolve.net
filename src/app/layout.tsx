import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SwiftSolve | AI Product Studio for LLM, Computer Vision & ML Applications",
  description:
    "SwiftSolve designs and builds production-ready AI products, including LLM systems, RAG pipelines, computer vision tools, automation platforms, data infrastructure, and polished product interfaces.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${googleSans.variable} h-full scroll-smooth bg-black`}>
      <body className="min-h-full antialiased bg-black text-foreground">{children}</body>
    </html>
  );
}
