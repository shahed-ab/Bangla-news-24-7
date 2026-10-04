import { getSections, getMostRead } from "@/lib/api";
import FeaturedCard from "@/components/FeaturedCard";
import HeadlineList from "@/components/HeadlineList";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import SectionHeading from "@/components/SectionHeading";

export const revalidate = 300;

export default async function HomePage() {
  const [sections, mostRead] = await Promise.all([
    getSections(),
    getMostRead(),
  ]);

  // Find "প্রধান খবর" section
  const mainSection = sections.find((s) => s.title === "প্রধান খবর") || sections[0];
  const featuredArticle = mainSection?.articles[0];
  const headlineArticles = mainSection?.articles.slice(1, 5) || [];

  // Find "নির্বাচিত খবর" section
  const selectedSection = sections.find((s) => s.title === "নির্বাচিত খবর");
  const selectedArticles = selectedSection?.articles.slice(0, 3) || [];

  // Remaining sections: exclude "প্রধান খবর" and "নির্বাচিত খবর"
  const remainingSections = sections.filter(
    (s) => s.title !== "প্রধান খবর" && s.title !== "নির্বাচিত খবর" && s.articles.length > 0
  );

  return (
    <div className="w-full pb-8">
      {/* Top 3-Column Desktop Grid: Main Area (2 cols) + Most Read (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Area: 2 Columns on desktop */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Main Top Row: FeaturedCard (Left) + HeadlineList (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {featuredArticle && <FeaturedCard article={featuredArticle} />}
            {headlineArticles.length > 0 && (
              <HeadlineList articles={headlineArticles} />
            )}
          </div>

          {/* Section: নির্বাচিত খবর (3-Card Grid) */}
          {selectedArticles.length > 0 && (
            <div>
              <SectionHeading title="নির্বাচিত খবর" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedArticles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: সর্বাধিক পঠিত */}
        <div className="lg:col-span-1">
          <MostRead articles={mostRead} />
        </div>
      </div>

      {/* Remaining Sections: বাংলাদেশ, ভারত, বিশ্ব, স্বাস্থ্য, ভিডিও, অন্যান্য খবর, etc. */}
      {remainingSections.map((section) => (
        <section key={section.title} className="mt-8">
          <SectionHeading title={section.title} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {section.articles.slice(0, 4).map((article) => (
              <NewsCard key={article.id} article={article} showTime={true} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
