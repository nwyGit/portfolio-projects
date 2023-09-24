"use client";

import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TbPhotoPlus } from "react-icons/tb";

import utilServices from "@/app/services/util";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  url: { imageSrc: string; setImageSrc: (imageSrc: string) => void };
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, url }) => {
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const imageData = new FormData();
      imageData.append("file", acceptedFiles[0]);

      const response = await utilServices.uploadImage(imageData);
      url.setImageSrc(response.url);
      onChange(response.objectKey);
    },
    [url, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
    >
      <input {...getInputProps()} />
      <TbPhotoPlus size={50} />
      {isDragActive ? (
        <p className="font-semibold text-lg text-center">
          Drop the picture here ...
        </p>
      ) : (
        <div className="font-semibold text-lg text-center">
          <p>Drag &apos;n&apos; drop picture here, or</p>
          <p>Click to select picture</p>
        </div>
      )}
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
            src={url.imageSrc}
            alt="House"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
