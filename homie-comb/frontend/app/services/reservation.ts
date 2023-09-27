import axios from "axios";
import { Reservation } from "../types";
import { config, decodedToken } from "./auth";

const getReservationsByListingId = async (listingId: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations/${listingId}`,
  );
  return response.data;
};

const addTrip = async (data: Reservation) => {
  const newReservation = {
    ...data,
    email: decodedToken?.sub,
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
    newReservation,
    { ...config },
  );

  return response.data;
};

const deleteReservation = async (id: number) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/reservations/${id}`, {
    ...config,
  });
};

const reservationServices = {
  getReservationsByListingId,
  addTrip,
  deleteReservation,
};

export default reservationServices;
