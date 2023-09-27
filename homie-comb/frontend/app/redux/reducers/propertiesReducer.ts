import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Listing } from "../../types";
import userServices from "@/app/services/user";
import listingServices from "@/app/services/listing";
import { sorter } from "@/app/helpers/sorter";

const initialState: Listing[] = [];

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setPropertiesReducer(state, action) {
      return action.payload;
    },
    addPropertyReducer(state, action) {
      state.push(action.payload);
      sorter(state);
    },
    deletePropertyReducer(state, action) {
      return state.filter((property) => property.id !== action.payload);
    },
  },
});

export const {
  setPropertiesReducer,
  addPropertyReducer,
  deletePropertyReducer,
} = propertiesSlice.actions;

export const setProperties = (username: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const properties = await userServices.getUserProperties(username);
      dispatch(setPropertiesReducer(properties));
    } catch (error) {
      throw error;
    }
  };
};

export const addProperty = (data: Listing) => {
  return async (dispatch: AppDispatch) => {
    try {
      const newProperty = await listingServices.addListing(data);
      dispatch(addPropertyReducer(newProperty));
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProperty = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await listingServices.deleteListing(id);
      dispatch(deletePropertyReducer(id));
    } catch (error) {
      throw error;
    }
  };
};

export default propertiesSlice.reducer;
