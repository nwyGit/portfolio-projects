"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="relative h-[40px] w-[130px]">
      <Image
        onClick={() => router.push("/")}
        alt="logo"
        className="hidden md:block cursor-pointer"
        fill
        sizes="(max-width: 768px) 30px, (max-width: 1200px) 65px, 33vw"
        src="/images/logo.png"
      />
    </div>
  );
};

export default Logo;
