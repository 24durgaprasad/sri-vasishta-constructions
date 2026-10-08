import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { FloatingActions } from "@/components/layout/FloatingActions";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sri Vasishta Constructions",
  description: "RERA-approved homes and commercial spaces.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">{children}<FloatingActions /></body>
    </html>
  );
}