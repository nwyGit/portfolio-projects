import axios from "axios";
import jwtDecode from "jwt-decode";

import { Listing, currentUser } from "../types";

const getAllListings = async (query: any) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/listings`,
    { params: query },
  );

  return response.data;
};

const getListingById = async (id: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/listings/${id}`,
  );

  return response.data;
};

const addListing = async (listing: Listing) => {
  const token = localStorage.getItem("access_token");
  const decodedToken: currentUser | null = token ? jwtDecode(token) : null;

  const newListing = {
    ...listing,
    location: listing.location.value,
    email: decodedToken?.sub,
  };

  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/listings`, newListing);
};

const listingServices = { getAllListings, getListingById, addListing };

export default listingServices;
