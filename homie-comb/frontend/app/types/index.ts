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
	id?: number;
	title: string;
	description: string;
	category: string;
	location: CountrySelectValue;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	imageKey: string;
	price: number;
}

export interface currentUser {
	sub: string;
	username: string;
	favoriteIds: number[];
}
