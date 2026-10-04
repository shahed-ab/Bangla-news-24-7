"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 bg-red-100 text-[#c8102e] rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-4">
        !
      </div>
      <h1 className="font-serif font-bold text-2xl sm:text-3xl text-neutral-900 mb-2">
        কিছু ভুল হয়েছে
      </h1>
      <p className="font-sans text-sm text-neutral-500 max-w-md mb-6">
        দুঃখিত, তথ্য লোড করার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          type="button"
          className="bg-[#c8102e] hover:bg-[#a30d25] text-white px-5 py-2.5 rounded font-semibold text-sm transition-colors cursor-pointer"
        >
          আবার চেষ্টা করুন
        </button>
        <Link
          href="/"
          className="border border-[#e5e5e5] bg-white hover:bg-neutral-50 text-neutral-700 px-5 py-2.5 rounded font-semibold text-sm transition-colors"
        >
          মূল পাতা
        </Link>
      </div>
    </div>
  );
}
