"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import {
  setUserByCredentials,
  setUserByToken,
} from "@/app/redux/reducers/userReducer";
import useListingModal from "@/app/hooks/useListingModal";
import toast from "react-hot-toast";
import { setFavorites } from "@/app/redux/reducers/favoritesReducer";

const UserMenu = () => {
  const currentUser = useAppSelector((state) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const listingModal = useListingModal();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("access_token");
    if (loggedUserJSON) {
      dispatch(setUserByToken(loggedUserJSON));
    }
  }, [dispatch]);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const signOut = async () => {
    router.push("/");
    toast.success("Logged out");
    await dispatch(setFavorites(null));
    await dispatch(setUserByCredentials(null));
    toggleOpen();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden lg:block text-sm font-semibold py-3 px-4">
          <span>{currentUser?.sub ? currentUser.username : null}</span>
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.avatarKey as string} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[20vw]  bg-white overflow-hidden left-0 md:left-auto md:right-0 top-14 md:top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser?.sub ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My properties"
                />
                <MenuItem label="Become a host" onClick={listingModal.onOpen} />
                <hr />
                <MenuItem label="Logout" onClick={signOut} />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
