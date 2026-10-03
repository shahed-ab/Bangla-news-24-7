import type { Metadata } from "next";
import { Noto_Serif_Bengali, Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bangla News 24 - সত্য ও নিরপেক্ষ বাংলা সংবাদ",
  description: "সর্বশেষ জাতীয়, আন্তর্জাতিক, রাজনীতি, অর্থনীতি, খেলাধুলা ও প্রযুক্তির বাংলা সংবাদ।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${notoSerifBengali.variable} ${hindSiliguri.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#f6f6f6] text-[#1a1a1a]">
        <Toaster position="top-right" />
        <Header />
        <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
