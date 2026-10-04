"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import AuthButtons from "./AuthButtons";

export default function HeaderAuth() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <AuthButtons
      userName={session?.user?.name}
      onSignOut={handleSignOut}
    />
  );
}
