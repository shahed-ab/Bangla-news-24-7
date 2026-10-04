import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticle, getMostRead } from "@/lib/api";
import { formatBanglaDateTime, formatByline } from "@/lib/format";
import ArticleBody from "@/components/ArticleBody";
import MostRead from "@/components/MostRead";

export const revalidate = 300;

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return {
      title: "সংবাদটি পাওয়া যায়নি - Bangla News 24",
    };
  }

  const ogImages = article.imageUrl ? [{ url: article.imageUrl }] : [];

  return {
    title: `${article.title} - Bangla News 24`,
    description: article.description || article.title,
    openGraph: {
      title: article.title,
      description: article.description || article.title,
      images: ogImages,
      type: "article",
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const [article, mostRead] = await Promise.all([
    getArticle(id),
    getMostRead(),
  ]);

  if (!article) {
    notFound();
  }

  const publishedTime = article.firstPublished || article.lastPublished;
  const categoryName = article.topics?.[0]?.name || "জাতীয়";
  const firstBlockIsImage = article.body?.[0]?.type === "image";
  const bylineText = formatByline(article.byline);

  return (
    <div className="w-full pb-16 pt-2">
      {/* 3-Column Desktop Grid: Main Article (2 cols) + Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Article Content */}
        <article className="lg:col-span-2 bg-white border border-[#e5e5e5] rounded-[4px] p-5 sm:p-8">
          {/* Breadcrumb / Category */}
          <div className="flex items-center gap-2 text-xs font-sans mb-3">
            <Link href="/" className="text-neutral-500 hover:text-[#c8102e] transition-colors">
              হোম
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="font-bold text-[#c8102e]">{categoryName}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-neutral-900 leading-tight mb-4">
            {article.title}
          </h1>

          {/* Meta Info: Author & Published Time */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-500 font-sans pb-5 border-b border-[#e5e5e5] mb-6">
            {bylineText && (
              <span className="font-medium text-neutral-800">
                {bylineText}
              </span>
            )}
            {bylineText && publishedTime && <span>•</span>}
            {publishedTime && (
              <time>{formatBanglaDateTime(publishedTime)}</time>
            )}
            {article.wordCount && (
              <>
                <span>•</span>
                <span>{article.wordCount} শব্দ</span>
              </>
            )}
          </div>

          {/* Hero Image if not already in body */}
          {!firstBlockIsImage && article.imageUrl && (
            <div className="relative w-full aspect-[16/9] bg-neutral-100 rounded-[2px] overflow-hidden mb-6">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          )}

          {/* Structured Article Body */}
          <ArticleBody blocks={article.body} />

          {/* Topics and Tags */}
          {((article.topics && article.topics.length > 0) || (article.tags && article.tags.length > 0)) && (
            <div className="mt-10 pt-6 border-t border-[#e5e5e5]">
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                সম্পর্কিত বিষয়
              </h4>
              <div className="flex flex-wrap gap-2">
                {article.topics?.map((topic) => (
                  <span
                    key={topic.id}
                    className="inline-block bg-neutral-100 hover:bg-[#c8102e] hover:text-white px-3 py-1 rounded-full text-xs font-sans text-neutral-700 transition-colors"
                  >
                    {topic.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar: সর্বাধিক পঠিত */}
        <aside className="lg:col-span-1">
          <MostRead articles={mostRead} />
        </aside>
      </div>
    </div>
  );
}
