import axios from "axios";
import { Credentials, userForm } from "../types";

const register = async (user: userForm) => {
	await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, user);
	return;
};

const login = async (credentials: Credentials) => {
	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
		credentials
	);
	return response.data.token;
};

const signOut = () => {
	localStorage.removeItem("access_token");
};

export default { register, login, signOut };
