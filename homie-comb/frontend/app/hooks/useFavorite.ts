import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import { AppDispatch, useAppSelector } from "../store";
import userServices from "../services/user";
import { useDispatch } from "react-redux";
import { setUserFavorites } from "../reducers/userReducer";

const useFavorite = (listingId: number) => {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser || currentUser.username.length === 0) {
        return loginModal.onOpen();
      }

      try {
        const newFavoriteIds = hasFavorited
          ? (currentUser.favoriteIds || []).filter((id) => id !== listingId)
          : [...(currentUser.favoriteIds || []), listingId];

        await userServices.updateUserFavorites(
          currentUser.username,
          newFavoriteIds,
        );

        dispatch(setUserFavorites(newFavoriteIds));

        router.refresh();
        toast.success("Favorites updated");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router, dispatch],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
