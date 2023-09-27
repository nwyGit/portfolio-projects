import reservationServices from "@/app/services/reservation";
import { Reservation } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import userServices from "@/app/services/user";

const initialState: Reservation[] = [];

const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setReservationsReducer(state, action) {
      return action.payload;
    },
    cancelReservationReducer(state, action) {
      return state.filter((reservation) => reservation.id !== action.payload);
    },
  },
});

export const { setReservationsReducer, cancelReservationReducer } =
  reservationSlice.actions;

export const setReservations = (username: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const data = await userServices.getUserReservations(username);
      dispatch(setReservationsReducer(data));
    } catch (error) {
      throw error;
    }
  };
};

export const cancelReservation = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await reservationServices.deleteReservation(id);
      dispatch(cancelReservationReducer(id));
    } catch (error) {
      throw error;
    }
  };
};

export default reservationSlice.reducer;
