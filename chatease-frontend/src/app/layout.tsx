import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Image from "next/image";
import ThemeSwitch from "@/components/custom/theme-switch";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  title: "Chatease",
  description: "Chat With Ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="mx-auto max-w-screen-2xl h-screen flex flex-col w-screen">
            <header className="flex justify-between items-center mx-auto max-w-screen-2xl px-4 py-2 w-full h-fit">
              <Link href="/" className="flex justify-center items-center gap-2">
                <Image
                  src="/chatease-logo.png"
                  alt="chatease-logo"
                  height="80"
                  width="80"
                />
                <h1 className="text-3xl font-semibold tracking-widest">
                  ChatEase
                </h1>
              </Link>
              <div className="flex items-center gap-2">
                <ThemeSwitch />
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
