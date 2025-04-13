"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import useUserStore from "@/store/userStore";

export default function UserAuthHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    async function checkUser() {
      if (user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getUser();
      const userId = data?.user?.id;

      if (!userId) {
        setLoading(false);
        return;
      }

      const { data: userData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (userData) {
        setUser(userData);
      }

      setLoading(false);
    }

    checkUser();
  }, [setUser, user]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }

    if (!loading && user && path.includes("login")) {
      router.replace("/dashboard");
    }
  }, [loading, user, path, router]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}
