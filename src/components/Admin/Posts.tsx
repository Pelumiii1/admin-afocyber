"use client";

import React from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Post } from "@/types";
import RemoteImage from "../RemoteImage";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

export default function Posts() {
  const router = useRouter();
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select("*");
    setPosts(data || []);
    setLoading(false);
  };

  const handlePostClick = (post: Post) => {
    router.push(`/new-post?edit=${post.id}`);
  };

  const handleDelete = async (post: Post) => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", post.id)
      .single();
    if (!error) {
      setPosts(posts.filter((p) => p.id !== post.id));
    }
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-[25px]">No Post</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 grid grid-cols-1 md:grid-cols-1">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border shadow-md rounded-lg w-full hover:shadow-xl cursor-pointer bg-white transition-all duration-500 md:flex"
        >
          <div className="flex justify-center">
            <RemoteImage
              path={post.image_url}
              alt={post.title}
              width={400}
              height={100}
            />
          </div>

          <div>
            <div className="p-5">
              <h1 className="text-[12px] md:text-[18px] font-bold text-gray-900 line-clamp-2">
                {post.title}
              </h1>
              <p className="mt-1 line-clamp-2 text-[10px] md:text-[18px] mb-3">
                {post.description}
              </p>

              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="prose max-w-none line-clamp-3 text-[12px] md:text-[15px]"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-5 p-5">
              <button
                onClick={() => handlePostClick(post)}
                className="flex items-center gap-1"
              >
                <CiEdit />
                Edit
              </button>
              <button
                onClick={() => handleDelete(post)}
                className="bg-red-500 px-5 py-1 rounded-lg text-white flex items-center gap-1"
              >
                <FaRegTrashAlt size={15} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
