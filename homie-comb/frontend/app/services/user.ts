import axios from "axios";

const updateUserFavorites = async (
  username: string,
  newFavoriteIds: number[],
) => {
  await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/favorites`,
    { newFavoriteIds },
  );
};

const userServices = {
  updateUserFavorites,
};

export default userServices;
