import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import userServices from "@/app/services/user";
import { Favorite } from "@/app/types";

const initialState: Favorite = { ids: [], listings: [] };

const favoritesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		setFavoritesReducer(state, action) {
			return action.payload;
		},
	},
});

export const { setFavoritesReducer } = favoritesSlice.actions;

export const setFavorites = (username: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			console.log("should be called");

			const favoriteObj = await userServices.getUserFavorites(username);
			dispatch(setFavoritesReducer(favoriteObj));
		} catch (error) {
			throw error;
		}
	};
};

export const updateFavorites = (username: string, newFavorites: number[]) => {
	return async () => {
		try {
			await userServices.updateUserFavorites(username, newFavorites);
			setFavorites(username);
		} catch (error) {
			throw error;
		}
	};
};

export default favoritesSlice.reducer;
