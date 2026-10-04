import Link from "next/link";
import { getCategories, getNews } from "@/lib/api";
import { getCurrentBanglaDate } from "@/lib/format";
import NavLinks from "./NavLinks";
import HeaderAuth from "./HeaderAuth";
import TickerBar from "./TickerBar";

export default async function Header() {
  const [categories, latestNews] = await Promise.all([
    getCategories(),
    getNews({ limit: 15 }),
  ]);
  const banglaDate = getCurrentBanglaDate();

  return (
    <header className="w-full bg-white border-b border-[#e5e5e5]">
      {/* Top Header Row */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-5 pb-3">
        <div className="flex items-center justify-between">
          {/* Left Spacer for symmetrical logo centering */}
          <div className="w-[140px] hidden sm:block" />

          {/* Centered Logo & Date */}
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="w-9 h-9 sm:w-10 sm:h-10 bg-[#c8102e] rounded-lg flex items-center justify-center text-white font-serif font-bold text-2xl sm:text-3xl shadow-sm transition-transform group-hover:scale-105">
                B
              </span>
              <span className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-[#c8102e]">
                Bangla News 24
              </span>
            </Link>
            <p className="text-xs sm:text-[13px] text-neutral-500 font-sans mt-1">
              {banglaDate}
            </p>
          </div>

          {/* Right Auth Area */}
          <div className="min-w-[140px] flex justify-end">
            <HeaderAuth />
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="border-t border-[#e5e5e5]">
        <div className="max-w-[1280px] mx-auto">
          <NavLinks categories={categories} />
        </div>
      </div>

      {/* Latest News Ticker */}
      <TickerBar articles={latestNews} />
    </header>
  );
}
