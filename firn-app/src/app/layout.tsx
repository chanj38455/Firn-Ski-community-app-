import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Firn — The Ski Community",
  description:
    "Resort info, maps, reviews and community for skiers and snowboarders. Jobs, accommodation, ski buddies and events for Verbier, Chamonix, Whistler and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <SessionWrapper>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-800 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
              <p className="mb-2 font-semibold text-slate-400">Firn ⛰️</p>
              <p>The ski community for seasonnaires, holiday skiers and mountain lovers.</p>
              <p className="mt-1">Verbier · Gstaad · Chamonix · Whistler · Queenstown</p>
            </div>
          </footer>
        </SessionWrapper>
      </body>
    </html>
  );
}
