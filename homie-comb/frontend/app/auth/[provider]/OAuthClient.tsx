"use client";

import { setUserByToken } from "@/app/redux/reducers/userReducer";
import { AppDispatch } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface IOAuthParams {
  token?: string;
}

const OAuthClient: React.FC<IOAuthParams> = ({ token }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(setUserByToken(token as string));
    router.push("/");
  }, [dispatch, router, token]);

  return null;
};

export default OAuthClient;
