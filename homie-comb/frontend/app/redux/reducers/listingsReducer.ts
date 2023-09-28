import { createSlice } from "@reduxjs/toolkit";
import listingServices from "../../services/listing";
import { AppDispatch } from "../store";
import { Listing } from "../../types";

const initialState: Listing[] = [];

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    initializeListingsReducer(state, action) {
      return action.payload;
    },
  },
});

export const { initializeListingsReducer } = listingsSlice.actions;

export const initializeListings = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const listings = await listingServices.getAllListings({});
      dispatch(initializeListingsReducer(listings));
    } catch (error) {
      throw error;
    }
  };
};

export default listingsSlice.reducer;
