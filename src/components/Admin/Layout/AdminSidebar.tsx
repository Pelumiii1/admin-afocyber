"use client";
import React from "react";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { LuHouse } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import Image from "next/image";
import useUserStore from "@/store/userStore";

const AdminSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const navigation = [
    {
      name: "All Posts",
      href: "/dashboard",
      icon: <LuHouse size={18} />,
    },
    {
      name: "New Post",
      href: "/new-post",
      icon: <FaPlus />,
    },
  ];

  return (
    <div className="hidden lg:flex w-[var(--sidebar-width)] h-screen border-r fixed">
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <div className="mb-8">
            <Image src="/logo-test.png" alt="" width={50} height={50} />
          </div>

          <nav className="space-y-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-fit ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-white hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="bottom-0 w-[var(--sidebar-width)] p-4 border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-md gap-2 hover:bg-gray-50 hover:text-gray-900 w-fit"
          >
            <TbLogout size={25} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
