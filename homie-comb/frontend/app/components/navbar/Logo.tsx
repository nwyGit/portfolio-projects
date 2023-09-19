"use client";

import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Logo = () => {
  //const router = useRouter();

  return (
    <Image
      alt="logo"
      className="hidden md:block cursor-pointer"
      height="40"
      width="40"
      src="/images/logo.png"
    />
  );
};

export default Logo;
