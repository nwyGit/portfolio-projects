import { createSlice } from "@reduxjs/toolkit";
import authService from "@/app/services/auth";
import jwtDecode from "jwt-decode";
import { AppDispatch } from "../store";
import { Credentials } from "../types";

interface DecodedToken {
	sub: string;
}

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUserReducer(state, action) {
			return action.payload;
		},
	},
});

export const { setUserReducer } = userSlice.actions;
export const setUser = (credentials: Credentials | null) => {
	return async (dispatch: AppDispatch) => {
		if (credentials) {
			const token = await authService.login(credentials);
			localStorage.setItem("access_token", token);
			const decodedToken = jwtDecode(token) as DecodedToken;
			dispatch(setUserReducer(decodedToken.sub));
		} else {
			dispatch(setUserReducer(null));
		}
	};
};
export default userSlice.reducer;
