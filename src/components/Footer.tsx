import Link from "next/link";
import { getCategories } from "@/lib/api";

export default async function Footer() {
  const categories = await getCategories();

  return (
    <footer className="w-full bg-white border-t border-[#e5e5e5] mt-16 font-sans text-neutral-600">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#e5e5e5]">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="w-8 h-8 bg-[#c8102e] rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">
                B
              </span>
              <span className="font-serif font-bold text-2xl tracking-tight text-[#c8102e]">
                Bangla News 24
              </span>
            </Link>
            <p className="text-xs text-neutral-500 mt-2 max-w-sm">
              সর্বশেষ সত্য ও নিরপেক্ষ বাংলা সংবাদের নির্ভরযোগ্য অনলাইন মাধ্যম।
            </p>
          </div>

          {/* Category Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
            <Link href="/" className="hover:text-[#c8102e] transition-colors">
              হোম
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="hover:text-[#c8102e] transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 text-center text-xs text-neutral-400">
          <p>স্বত্ব © ২০২৬ বাংলা নিউজ ২৪. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
