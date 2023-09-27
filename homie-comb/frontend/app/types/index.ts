import { CountrySelectValue } from "../components/inputs/CountrySelect";

export interface userForm {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Listing {
  title: string;
  description: string;
  category: string;
  location: CountrySelectValue;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageKey: string;
  price: number;
  id?: number;
  createdAt?: string;
  user?: listingUser;
}

export interface Reservation {
  startDate: string;
  endDate: string;
  totalPrice: number;
  listingId: number;
  id?: number;
  createdAt?: string;
  listing?: Listing;
}

export interface Favorite {
  ids: number[];
  listings: Listing[];
}

export interface currentUser {
  sub: string;
  username: string;
  avatarKey: string;
  favoriteIds: number[];
}

export interface listingUser {
  username: string;
  avatarKey: string;
}
