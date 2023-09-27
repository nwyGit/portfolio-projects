import { Listing, Reservation } from "../types";

export const sorter = (array: Reservation[] | Listing[]) => {
  return array.sort((a, b) => {
    const dateA = new Date(a.createdAt || "").valueOf();
    const dateB = new Date(b.createdAt || "").valueOf();
    return dateB - dateA;
  });
};
