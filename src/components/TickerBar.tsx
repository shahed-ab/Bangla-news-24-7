"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import type { NewsArticle } from "@/types/news";

interface TickerBarProps {
  articles?: NewsArticle[];
}

const emptySubscribe = () => () => {};

export default function TickerBar({ articles = [] }: TickerBarProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const validArticles = articles.filter((item) => item.type === "article");

  if (validArticles.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-[#c8102e] text-white flex items-stretch h-10 overflow-hidden shadow-inner">
      {/* Darker red label on left */}
      <div className="bg-[#a30d25] px-4 sm:px-6 flex items-center justify-center font-bold text-xs sm:text-sm tracking-wide shrink-0 z-10 shadow-md">
        সর্বশেষ
      </div>

      {/* Marquee ticker */}
      <div className="flex-1 flex items-center overflow-hidden text-xs sm:text-sm font-sans">
        {isMounted ? (
          <MarqueeText
            duration={45}
            pauseOnHover={true}
            className="flex items-center gap-6 py-2"
          >
            {validArticles.map((article, idx) => (
              <span key={article.id || idx} className="inline-flex items-center gap-6">
                <Link
                  href={`/news/${article.id}`}
                  className="hover:underline transition-opacity hover:opacity-90 whitespace-nowrap"
                >
                  {article.title}
                </Link>
                <span className="text-white/70 select-none text-base font-bold">•</span>
              </span>
            ))}
          </MarqueeText>
        ) : (
          <div className="flex items-center gap-6 px-4 truncate">
            {validArticles.slice(0, 3).map((article, idx) => (
              <span key={article.id || idx} className="inline-flex items-center gap-6">
                <Link
                  href={`/news/${article.id}`}
                  className="hover:underline whitespace-nowrap"
                >
                  {article.title}
                </Link>
                <span className="text-white/70 text-base font-bold">•</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
