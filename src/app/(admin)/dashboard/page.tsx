import Posts from "@/components/Admin/Posts";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 w-[calc(100vw-var(--sidebar-width))]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
          <Link
            href="/new-post"
            className="inline-flex gap-2 items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1B043A] hover:bg-[#2a0655] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <FaPlus />
            Create New Post
          </Link>
        </div>

        <div className="">
          <Posts />
        </div>
      </div>
    </div>
  );
}
