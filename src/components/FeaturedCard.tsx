import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/types/news";
import { formatBanglaDateTime } from "@/lib/format";

interface FeaturedCardProps {
  article: NewsArticle;
}

export default function FeaturedCard({ article }: FeaturedCardProps) {
  const publishedTime = article.firstPublished || article.lastPublished;

  return (
    <Link
      href={`/news/${article.id}`}
      className="group bg-white border border-[#e5e5e5] rounded-[4px] p-4 flex flex-col justify-between hover:shadow-sm transition-shadow h-full cursor-pointer"
    >
      <div>
        {/* Large Featured Image */}
        <div className="relative w-full aspect-[16/10] bg-neutral-100 rounded-[2px] overflow-hidden">
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400">
              <span className="font-serif text-3xl font-bold text-[#c8102e]/30">B</span>
            </div>
          )}
        </div>

        {/* Category Label */}
        <span className="inline-block text-[11px] sm:text-xs font-bold text-[#c8102e] font-sans mt-3 mb-1">
          {article.category || "প্রধান খবর"}
        </span>

        {/* Red Serif Headline */}
        <h2 className="font-serif font-bold text-lg sm:text-xl text-[#c8102e] group-hover:underline leading-snug line-clamp-2">
          {article.title}
        </h2>

        {/* 3-line Description */}
        {article.description && (
          <p className="font-sans text-xs sm:text-[13px] text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
            {article.description}
          </p>
        )}
      </div>

      {/* Bangla Timestamp */}
      {publishedTime && (
        <div className="mt-4 pt-2">
          <time className="text-[11px] text-neutral-400 font-sans block">
            {formatBanglaDateTime(publishedTime)}
          </time>
        </div>
      )}
    </Link>
  );
}
