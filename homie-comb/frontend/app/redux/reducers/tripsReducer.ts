import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Reservation } from "../../types";
import userServices from "@/app/services/user";
import reservationServices from "@/app/services/reservation";
import { sorter } from "@/app/helpers/sorter";

const initialState: Reservation[] = [];

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setTripsReducer(state, action) {
      return action.payload;
    },
    addTripReducer(state, action) {
      state.push(action.payload);
      sorter(state);
    },
    deleteTripReducer(state, action) {
      return state.filter((trip) => trip.id !== action.payload);
    },
  },
});

export const { setTripsReducer, addTripReducer, deleteTripReducer } =
  tripsSlice.actions;

export const setTrips = (username: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const trips = await userServices.getUserTrips(username);
      dispatch(setTripsReducer(trips));
    } catch (error) {
      throw error;
    }
  };
};

export const addTrip = (data: Reservation) => {
  return async (dispatch: AppDispatch) => {
    try {
      const newTrip = await reservationServices.addTrip(data);
      dispatch(addTripReducer(newTrip));
    } catch (error) {
      throw error;
    }
  };
};

export const deleteTrip = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await reservationServices.deleteReservation(id);
      dispatch(deleteTripReducer(id));
    } catch (error) {
      throw error;
    }
  };
};

export default tripsSlice.reducer;
