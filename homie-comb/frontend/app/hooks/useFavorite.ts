import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import {
  setFavorites,
  updateFavorites,
} from "../redux/reducers/favoritesReducer";

const useFavorite = (listingId: number) => {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.user);
  const favoriteIds = useAppSelector((state) => state.favoriteListings.ids);
  const dispatch = useDispatch<AppDispatch>();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = favoriteIds || [];

    return list.includes(listingId);
  }, [favoriteIds, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser?.sub) {
        return loginModal.onOpen();
      }

      const data = hasFavorited
        ? favoriteIds.filter((id) => id !== listingId)
        : [...(favoriteIds || []), listingId];

      try {
        await dispatch(updateFavorites(currentUser.username, data as number[]));
        await dispatch(setFavorites(currentUser.username as string));
        router.refresh();
        toast.success("Favorites updated");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [
      currentUser,
      hasFavorited,
      favoriteIds,
      listingId,
      loginModal,
      dispatch,
      router,
    ],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
