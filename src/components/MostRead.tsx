import Link from "next/link";
import type { MostReadArticle } from "@/types/news";
import { toBengaliDigits } from "@/lib/format";

interface MostReadProps {
  articles: MostReadArticle[];
}

export default function MostRead({ articles }: MostReadProps) {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] p-4 h-full">
      <h3 className="font-serif font-bold text-lg text-neutral-900 pb-3 border-b border-[#e5e5e5]">
        সর্বাধিক পঠিত
      </h3>

      <div className="divide-y divide-[#e5e5e5]">
        {articles.slice(0, 10).map((article, index) => {
          const rankNumber = article.rank ? article.rank : index + 1;
          const banglaRank = toBengaliDigits(rankNumber);

          return (
            <Link
              key={article.id || index}
              href={`/news/${article.id}`}
              className="group flex items-start gap-3 py-3 first:pt-3 last:pb-1 cursor-pointer"
            >
              {/* Large Red Serif Bengali Numeral */}
              <span className="font-serif font-bold text-xl sm:text-2xl text-[#c8102e] shrink-0 w-6 text-center leading-tight">
                {banglaRank}
              </span>

              {/* Headline */}
              <p className="font-sans text-xs sm:text-[13px] font-semibold text-neutral-800 leading-snug group-hover:text-[#c8102e] group-hover:underline transition-colors line-clamp-2">
                {article.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
