import axios from "axios";
import { Reservation, currentUser } from "../types";
import jwtDecode from "jwt-decode";

const getReservationsById = async (listingId: number) => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/reservations/${listingId}`
	);
	return response.data;
};

const addReservation = async (data: Reservation) => {
	const token = localStorage.getItem("access_token");
	const decodedToken: currentUser | null = token ? jwtDecode(token) : null;

	const newReservation = {
		...data,
		email: decodedToken?.sub,
	};

	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/reservations`,
		newReservation
	);

	return response.data;
};

const deleteReservation = async (id: number) => {
	await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/reservations/${id}`);
};

const reservationServices = {
	getReservationsById,
	addReservation,
	deleteReservation,
};

export default reservationServices;
