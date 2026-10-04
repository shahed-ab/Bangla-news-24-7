import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 bg-red-100 text-[#c8102e] rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-4">
        ৪MD
      </div>
      <h1 className="font-serif font-bold text-2xl sm:text-3xl text-neutral-900 mb-2">
        পৃষ্ঠাটি পাওয়া যায়নি
      </h1>
      <p className="font-sans text-sm text-neutral-500 max-w-md mb-6">
        আপনি যে সংবাদ বা পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানাটি ভুল হতে পারে।
      </p>
      <Link
        href="/"
        className="bg-[#c8102e] hover:bg-[#a30d25] text-white px-5 py-2.5 rounded font-semibold text-sm transition-colors"
      >
        মূল পাতায় ফিরে যান
      </Link>
    </div>
  );
}
