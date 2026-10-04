"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password) {
      const err = "অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড দিন।";
      setErrorMsg(err);
      toast.error(err);
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn.email({
        email: email.trim(),
        password,
      });

      if (res.error) {
        const message = res.error.message || "ভুল ইমেইল বা পাসওয়ার্ড।";
        setErrorMsg(message);
        toast.error(message);
      } else {
        toast.success("সফলভাবে লগইন হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch (err: unknown) {
      console.error(err);
      const message = "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।";
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white border border-[#e5e5e5] rounded-[6px] shadow-sm p-6 sm:p-8">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <span className="w-8 h-8 bg-[#c8102e] rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">
              B
            </span>
            <span className="font-serif font-bold text-2xl tracking-tight text-[#c8102e]">
              Bangla News 24
            </span>
          </Link>
          <h2 className="font-serif font-bold text-xl text-neutral-900 mt-2">
            অ্যাকাউন্টে সাইন ইন করুন
          </h2>
          <p className="text-xs text-neutral-500 font-sans mt-1">
            আপনার ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করুন
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-sans rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              ইমেইল অ্যাড্রেস
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-[#e5e5e5] rounded focus:outline-none focus:border-[#c8102e] focus:bg-white text-neutral-900 transition-colors"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-neutral-700">
                পাসওয়ার্ড
              </label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-[#e5e5e5] rounded focus:outline-none focus:border-[#c8102e] focus:bg-white text-neutral-900 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#c8102e] hover:bg-[#a30d25] text-white py-2.5 rounded font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                লগইন হচ্ছে...
              </>
            ) : (
              "সাইন ইন করুন"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-neutral-600 font-sans">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/sign-up" className="text-[#c8102e] font-semibold hover:underline">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
