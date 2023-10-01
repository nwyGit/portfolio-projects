import axios from "axios";

import { Listing } from "../types";
import { config, decodedToken } from "./auth";

const getAllListings = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/listings`,
  );

  return response.data;
};

const getListingsWithParams = async (query: any) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/listings/search`,
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
  const newListing = {
    ...listing,
    location: listing.location.value,
    email: decodedToken()?.sub,
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/listings`,
    newListing,
    {
      ...config(),
    },
  );

  return response.data;
};

const deleteListing = async (id: number) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/listings/${id}`, {
    ...config(),
  });
};

const listingServices = {
  getAllListings,
  getListingById,
  getListingsWithParams,
  addListing,
  deleteListing,
};

export default listingServices;
