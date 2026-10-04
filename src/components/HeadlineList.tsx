import Link from "next/link";
import type { NewsArticle } from "@/types/news";

interface HeadlineListProps {
  articles: NewsArticle[];
}

export default function HeadlineList({ articles }: HeadlineListProps) {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] p-4 flex flex-col justify-between h-full divide-y divide-[#e5e5e5]">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/news/${article.id}`}
          className="group py-3 first:pt-0 last:pb-0 flex flex-col justify-center cursor-pointer"
        >
          <span className="text-[11px] font-bold text-[#c8102e] font-sans mb-1">
            {article.category || "প্রধান খবর"}
          </span>
          <h3 className="font-serif font-bold text-[14px] sm:text-[15px] leading-snug text-neutral-900 group-hover:text-[#c8102e] group-hover:underline transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}
