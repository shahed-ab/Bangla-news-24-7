import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/types/news";
import { formatBanglaDateTime } from "@/lib/format";

interface NewsCardProps {
  article: NewsArticle;
  showTime?: boolean;
}

export default function NewsCard({ article, showTime = false }: NewsCardProps) {
  const publishedTime = article.firstPublished || article.lastPublished;

  return (
    <Link
      href={`/news/${article.id}`}
      className="group bg-white border border-[#e5e5e5] rounded-[4px] overflow-hidden flex flex-col hover:shadow-sm transition-shadow h-full cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden shrink-0">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt || article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400">
            <span className="font-serif text-2xl font-bold text-[#c8102e]/30">B</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1">
        {article.category && (
          <span className="text-[11px] font-bold text-[#c8102e] font-sans mb-1">
            {article.category}
          </span>
        )}
        <h3 className="font-serif font-bold text-sm sm:text-[15px] leading-snug text-neutral-900 group-hover:text-[#c8102e] group-hover:underline transition-colors line-clamp-2">
          {article.title}
        </h3>

        {showTime && publishedTime && (
          <p className="text-[11px] text-neutral-400 font-sans mt-auto pt-2">
            {formatBanglaDateTime(publishedTime)}
          </p>
        )}
      </div>
    </Link>
  );
}
