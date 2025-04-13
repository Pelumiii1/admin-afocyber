import React, { FC, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface ImageUploadProps {
  setSelectedFile: (file: File | null) => void;
  setPreviewUrl: (url: string) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({
  setSelectedFile,
  setPreviewUrl,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  return (
    <div
      className="lg:w-[50vw] h-[200px] border rounded-lg px-2 py-2 cursor-pointer flex flex-col justify-center items-center"
      onClick={() => {
        imageInputRef.current?.click();
      }}
    >
      <div>
        <AiOutlineCloudUpload size={30} />
      </div>
      <span className="text-[#1B043A]">Click to upload image</span>
      <span className="text-sm text-gray-500 mt-1">
        (SVG, PNG, JPG or GIF — max. 800×400px)
      </span>
      <input
        id="imageInput"
        ref={imageInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;
