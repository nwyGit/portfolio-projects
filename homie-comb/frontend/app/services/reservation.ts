import axios from "axios";
import { ReservationRequest, currentUser } from "../types";
import jwtDecode from "jwt-decode";

const getAllReservations = async (query: any) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
    { params: query },
  );

  return response.data;
};

const addReservation = async (data: ReservationRequest) => {
  const token = localStorage.getItem("access_token");
  const decodedToken: currentUser | null = token ? jwtDecode(token) : null;

  const newReservation = {
    ...data,
    email: decodedToken?.sub,
  };

  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
    newReservation,
  );
};

const reservationServices = { getAllReservations, addReservation };

export default reservationServices;
