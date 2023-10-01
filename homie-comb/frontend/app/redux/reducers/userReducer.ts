import jwtDecode from "jwt-decode";

import { createSlice } from "@reduxjs/toolkit";
import authServices from "@/app/services/auth";

import { AppDispatch } from "../store";
import { Credentials, currentUser } from "../../types";
import { setFavorites } from "./favoritesReducer";

const initialState: currentUser = {
  sub: "",
  username: "",
  avatarKey: "",
  favoriteIds: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserReducer(state, action) {
      return action.payload;
    },
  },
});

export const { setUserReducer } = userSlice.actions;

export const setUserByCredentials = (credentials: Credentials | null) => {
  return async (dispatch: AppDispatch) => {
    try {
      if (credentials == null) {
        dispatch(setUserReducer(initialState));
      } else {
        const token = await authServices.loginUser(credentials as Credentials);
        dispatch(setUserByToken(token));
      }
    } catch (error) {
      throw error;
    }
  };
};

export const setUserByToken = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      localStorage.setItem("access_token", token);
      const decodedToken: currentUser = jwtDecode(token);
      dispatch(setUserReducer(decodedToken));
      dispatch(setFavorites(decodedToken.username));
    } catch (error) {
      throw error;
    }
  };
};

export default userSlice.reducer;
