import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import NextTopLoader from "nextjs-toploader";
import Footer from "./components/Footer";
import type { Viewport } from "next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "vernx Shop - Your Trusted Store",
  description:
    "vernx Shop: The best place for game top-ups, vouchers, and more. Fast, secure, and available 24/7 with complete payment options across Indonesia.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#171717] font-sans text-white`}
      >
        <NextTopLoader
          height={2}
          color="linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
