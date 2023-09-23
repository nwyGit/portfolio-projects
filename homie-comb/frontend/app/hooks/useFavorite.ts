import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import { useAppSelector } from "../store";

const useFavorite = (listingId: string) => {
	const router = useRouter();
	const currentUser = useAppSelector((state) => state.user);

	const loginModal = useLoginModal();

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favorites || [];

		return list.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {
				let request;

				if (hasFavorited) {
					request = () => axios.delete(`/api/favorites/${listingId}`);
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`);
				}

				await request();
				router.refresh();
				toast.success("Success");
			} catch (error) {
				toast.error("Something went wrong.");
			}
		},
		[currentUser, hasFavorited, listingId, loginModal, router]
	);

	return {
		hasFavorited,
		toggleFavorite,
	};
};

export default useFavorite;
