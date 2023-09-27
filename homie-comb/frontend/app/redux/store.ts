import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import listingsReducer from "./reducers/listingsReducer";
import tripsReducer from "./reducers/tripsReducer";
import propertiesReducer from "./reducers/propertiesReducer";
import reservationsReducer from "./reducers/reservationsReducer";
import favoritesReducer from "./reducers/favoritesReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    favoriteListings: favoritesReducer,
    listings: listingsReducer,
    trips: tripsReducer,
    reservations: reservationsReducer,
    properties: propertiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
