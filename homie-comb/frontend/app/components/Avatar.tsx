"use client";

import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={`${process.env.NEXT_PUBLIC_S3_AVATAR_URL}/${
        src ? src : "avatar_default.jpg"
      }`}
    />
  );
};

export default Avatar;
