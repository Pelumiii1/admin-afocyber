"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Image from "next/image";

type RemoteImageProps = {
  path?: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
};

const RemoteImage = ({ path, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState("");

  const DEFAULT_FALLBACK =
    "https://placehold.co/300x300?text=Image+Unavailable";

  useEffect(() => {
    if (!path) return;
    (async () => {
      const { data, error } = await supabase.storage
        .from("post-images")
        .download(path);
      if (error) {
        console.log(error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [path]);

  if (!image) {
  }

  return <Image src={image || DEFAULT_FALLBACK} alt="" {...imageProps} />;
};

export default RemoteImage;
