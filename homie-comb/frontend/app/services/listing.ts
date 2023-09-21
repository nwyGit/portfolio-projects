import axios from "axios";
import { Listing } from "../types";

const addListing = async (listing: Listing) => {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/listings`, listing);
};

const listingServices = {
  addListing,
};

export default listingServices;
