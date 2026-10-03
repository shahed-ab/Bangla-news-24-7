"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ApiCategory } from "@/types/news";

interface NavLinksProps {
  categories: ApiCategory[];
}

export default function NavLinks({ categories }: NavLinksProps) {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";

  return (
    <nav
      aria-label="Category Navigation"
      className="flex items-center justify-start sm:justify-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar py-2.5 px-4 text-[13px] sm:text-[14px] font-sans text-neutral-800"
    >
      <Link
        href="/"
        className={`transition-colors whitespace-nowrap hover:text-[#c8102e] ${
          isHomeActive ? "text-[#c8102e] font-bold" : "text-neutral-700"
        }`}
      >
        হোম
      </Link>
      {categories.map((cat) => {
        const href = `/category/${cat.slug}`;
        const isActive = pathname === href;
        return (
          <Link
            key={cat.slug}
            href={href}
            className={`transition-colors whitespace-nowrap hover:text-[#c8102e] ${
              isActive ? "text-[#c8102e] font-bold" : "text-neutral-700"
            }`}
          >
            {cat.title}
          </Link>
        );
      })}
    </nav>
  );
}
