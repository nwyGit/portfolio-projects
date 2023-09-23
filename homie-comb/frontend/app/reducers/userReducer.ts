import jwtDecode from "jwt-decode";

import { createSlice } from "@reduxjs/toolkit";
import authServices from "@/app/services/auth";

import { AppDispatch } from "../store";
import { Credentials, currentUser } from "../types";

const initialState: currentUser = {
	sub: "",
	username: "",
	favoriteIds: [],
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
	},
});

export const { setUserReducer, setUserFavoritesReducer } = userSlice.actions;
export const setUser = (credentials: Credentials | null) => {
	return async (dispatch: AppDispatch) => {
		try {
			if (credentials) {
				const token = await authServices.loginUser(credentials);
				localStorage.setItem("access_token", token);
				const decodedToken: currentUser | null = token
					? jwtDecode(token)
					: null;
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
export default userSlice.reducer;
