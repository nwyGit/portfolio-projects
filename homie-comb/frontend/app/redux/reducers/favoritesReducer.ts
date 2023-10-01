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

export const setFavorites = (username: string | null) => {
  return async (dispatch: AppDispatch) => {
    try {
      if (typeof username == "string") {
        const favoriteObj = await userServices.getUserFavorites(username);
        dispatch(setFavoritesReducer(favoriteObj));
      } else {
        dispatch(setFavoritesReducer(initialState));
      }
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
