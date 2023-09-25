import jwtDecode from "jwt-decode";

import { createSlice } from "@reduxjs/toolkit";
import authServices from "@/app/services/auth";

import { AppDispatch } from "../store";
import { Credentials, Reservation, currentUser } from "../types";

const initialState: currentUser = {
	sub: "",
	username: "",
	avatarKey: "",
	favoriteIds: [],
	trips: [],
	reservations: [],
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserReducer(state, action) {
			return action.payload;
		},
		setUserFavoritesReducer(state, action) {
			state.favoriteIds = action.payload;
		},
		addUserTripsReducer(state, action) {
			state.trips.push(action.payload);
			sorter(state.trips);
		},
		addUserReservationsReducer(state, action) {
			state.reservations.push(action.payload);
			sorter(state.reservations);
		},
		deleteUserTripsReducer(state, action) {
			state.trips = state.trips.filter((trip) => trip.id !== action.payload);
			sorter(state.trips);
		},
		deleteUserReservationsReducer(state, action) {
			state.reservations = state.reservations.filter(
				(reservation) => reservation.id !== action.payload
			);
			sorter(state.reservations);
		},
	},
});

const sorter = (array: Reservation[]) => {
	return array.sort((a, b) => {
		const dateA = new Date(a.createdAt || "").valueOf();
		const dateB = new Date(b.createdAt || "").valueOf();
		return dateB - dateA;
	});
};

export const {
	setUserReducer,
	setUserFavoritesReducer,
	addUserTripsReducer,
	addUserReservationsReducer,
	deleteUserTripsReducer,
	deleteUserReservationsReducer,
} = userSlice.actions;

export const setUser = (credentials: Credentials | null) => {
	return async (dispatch: AppDispatch) => {
		try {
			if (credentials) {
				const token = await authServices.loginUser(credentials);
				localStorage.setItem("access_token", token);
				const decodedToken: currentUser | null = token
					? jwtDecode(token)
					: null;
				console.log(decodedToken);

				dispatch(setUserReducer(decodedToken));
			} else {
				dispatch(setUserReducer(null));
			}
		} catch (error) {
			throw error;
		}
	};
};

export const setUserFavorites = (favoritesList: number[]) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(setUserFavoritesReducer(favoritesList));
		} catch (error) {
			throw error;
		}
	};
};

export const addUserTrips = (newTrip: Reservation) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(addUserTripsReducer(newTrip));
		} catch (error) {
			throw error;
		}
	};
};

export const addUserReservations = (newReservation: Reservation) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(addUserReservationsReducer(newReservation));
		} catch (error) {
			throw error;
		}
	};
};

export const deleteUserTrips = (id: number) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(deleteUserTripsReducer(id));
		} catch (error) {
			throw error;
		}
	};
};

export const deleteUserReservations = (id: number) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(deleteUserReservationsReducer(id));
		} catch (error) {
			throw error;
		}
	};
};

export default userSlice.reducer;
