import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryNews } from "@/lib/api";
import NewsCard from "@/components/NewsCard";
import SectionHeading from "@/components/SectionHeading";

export const revalidate = 300;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategoryNews(slug);

  if (!data) {
    return {
      title: "বিভাগ পাওয়া যায়নি - Bangla News 24",
    };
  }

  return {
    title: `${data.title} - Bangla News 24`,
    description: `${data.title} সম্পর্কিত সর্বশেষ বাংলা খবর, বিশ্লেষণ ও আপডেট।`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const data = await getCategoryNews(slug);

  if (!data) {
    notFound();
  }

  const { title, articles } = data;

  return (
    <div className="w-full pb-12">
      {/* Category Header */}
      <SectionHeading title={title} />

      {/* Articles Grid or Empty State */}
      {articles.length === 0 ? (
        <div className="bg-white border border-[#e5e5e5] rounded-[4px] p-8 text-center my-6">
          <p className="text-neutral-500 font-sans text-sm">
            এই বিভাগে বর্তমানে কোনো সংবাদ পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} showTime={true} />
          ))}
        </div>
      )}
    </div>
  );
}
