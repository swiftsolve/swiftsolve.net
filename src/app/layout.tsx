import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwiftSolve | AI Product Studio",
  description:
    "SwiftSolve builds intelligent products with exceptional UI: production AI, thoughtful interaction design, and ML infrastructure for teams that care how software feels and performs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full scroll-smooth bg-black`}>
      <body className="min-h-full antialiased bg-black text-foreground">{children}</body>
    </html>
  );
}
