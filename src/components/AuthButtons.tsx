"use client";

import Link from "next/link";

interface AuthButtonsProps {
  userName?: string | null;
  onSignOut?: () => void;
}

export default function AuthButtons({ userName, onSignOut }: AuthButtonsProps) {
  if (userName) {
    return (
      <div className="flex items-center gap-3 text-xs sm:text-sm font-sans">
        <span className="text-neutral-700 font-medium truncate max-w-[120px] sm:max-w-[180px]">
          {userName}
        </span>
        <button
          onClick={onSignOut}
          type="button"
          className="text-neutral-600 hover:text-[#c8102e] font-medium transition-colors cursor-pointer"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-xs sm:text-sm font-sans">
      <Link
        href="/sign-in"
        className="text-neutral-700 hover:text-[#c8102e] font-medium transition-colors"
      >
        সাইন ইন
      </Link>
      <Link
        href="/sign-up"
        className="bg-[#c8102e] hover:bg-[#a30d25] text-white px-3.5 py-1.5 rounded-[4px] font-semibold text-xs transition-colors"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
