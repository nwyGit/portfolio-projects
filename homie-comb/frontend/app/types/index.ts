import { CountrySelectValue } from "../components/inputs/CountrySelect";

export type userForm = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

export type Credentials = { username: string; password: string };

export type Listing = {
  category: string;
  location: CountrySelectValue;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
};
