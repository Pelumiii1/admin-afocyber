"use client";

import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import useUserStore from "@/store/userStore";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import TextEditor from "../TextEditor";
import RemoteImage from "../RemoteImage";

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url?: string;
}

const NewPostForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editPostId = searchParams.get("edit");
  const [loading, setLoading] = useState(false);
  const [newPost, setNewPost] = useState<Post>({
    id: "",
    title: "",
    description: "",
    content: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const user = useUserStore((state) => state.user);

  console.log(user);

  useEffect(() => {
    if (editPostId) {
      fetchPost(editPostId);
    }
  }, [editPostId]);

  const fetchPost = async (id: string) => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      return;
    }

    if (data) {
      setNewPost(data);
      if (data.image_url) {
        setPreviewUrl(data.image_url);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      if (editPostId) {
        await updatePost();
      } else {
        await createPost();
      }
      router.push("/dashboard");

      // Reset form on success
      setNewPost({
        id: "",
        title: "",
        description: "",
        content: "",
      });
      setSelectedFile(null);
      setPreviewUrl("");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      return "";
    }
    const fileExt = selectedFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    // Upload image to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(`uploads/${fileName}`, selectedFile);

    if (uploadError) throw uploadError;

    // setImagePath(uploadData.path);
    return uploadData.path;
  };

  const createPost = async () => {
    let imagePath;
    if (selectedFile) {
      imagePath = await uploadImage();
    }
    const { error: insertError } = await supabase
      .from("posts")
      .insert({
        title: newPost.title,
        description: newPost.description,
        content: newPost.content,
        image_url: imagePath,
        author: user?.id,
      })
      .select()
      .single();

    if (insertError) throw insertError;
  };

  const updatePost = async () => {
    let imagePath;
    if (selectedFile) {
      imagePath = await uploadImage();
    }

    const { error: updateError } = await supabase
      .from("posts")
      .update({
        title: newPost.title,
        description: newPost.description,
        content: newPost.content,
        image_url: imagePath,
      })
      .eq("id", editPostId);

    if (updateError) throw updateError;
  };

  return (
    <div>
      <form
        className="space-y-5 my-10 w-full lg:w-[50vw] text-[12px]"
        onSubmit={handleSubmit}
      >
        <div className="grid">
          <label className="text-[15px]">Title</label>
          <input
            name="title"
            value={newPost.title}
            onChange={handleChange}
            type="text"
            placeholder="Enter Post Title"
            className="border rounded-lg px-2 py-2"
            required
          />
        </div>
        <div className="grid">
          <label className="text-[15px]">Description</label>
          <input
            name="description"
            value={newPost.description}
            onChange={handleChange}
            type="text"
            placeholder="Enter Post Description"
            className="border rounded-lg px-2 py-2"
            required
          />
        </div>
        <div className="grid">
          <label className="text-[15px]">Content</label>
          {/* <textarea
            name="content"
            value={newPost.content}
            onChange={handleChange}
            placeholder="Enter Post Content"
            className=" h-[200px] border rounded-lg px-2 py-2"
            required
          /> */}

          <TextEditor
            content={newPost.content}
            setContent={(value) =>
              setNewPost((prev) => ({ ...prev, content: value }))
            }
          />
        </div>
        {selectedFile || previewUrl ? (
          editPostId ? (
            <RemoteImage
              path={previewUrl}
              alt="Preview"
              width={64}
              height={64}
              className="w-auto h-[180px]"
            />
          ) : (
            <Image
              src={previewUrl}
              alt="Preview"
              width={64}
              height={64}
              className="w-auto h-[180px]"
            />
          )
        ) : (
          <ImageUpload
            setSelectedFile={setSelectedFile}
            setPreviewUrl={setPreviewUrl}
          />
        )}

        <button
          type="submit"
          className={`${
            loading ? "opacity-50" : ""
          } bg-[#1B043A] py-4 rounded-md px-10 text-white shadow-xl cursor-pointer`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : editPostId ? (
            "Update Post"
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
