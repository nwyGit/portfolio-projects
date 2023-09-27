import axios from "axios";

import { config } from "./auth";

const getUserFavorites = async (username: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/favorites`,
    { ...config },
  );

  return response.data;
};

const updateUserFavorites = async (
  username: string,
  newFavorites: number[],
) => {
  await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/favorites`,
    { newFavorites },
    { ...config },
  );
};

const getUserTrips = async (username: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/trips`,
    { ...config },
  );
  return response.data;
};

const getUserReservations = async (username: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/reservations`,
    { ...config },
  );

  return response.data;
};

const getUserProperties = async (username: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/listings`,
    { ...config },
  );

  return response.data;
};

const userServices = {
  getUserFavorites,
  getUserTrips,
  getUserReservations,
  getUserProperties,
  updateUserFavorites,
};

export default userServices;
