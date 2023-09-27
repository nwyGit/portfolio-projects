import axios from "axios";

import { Credentials, currentUser, userForm } from "../types";
import jwtDecode from "jwt-decode";

let token;
const ISSERVER = typeof window === "undefined";

if (!ISSERVER) {
  token = localStorage.getItem("access_token");
}

const registerUser = async (user: userForm) => {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, user);
};

const loginUser = async (credentials: Credentials) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    credentials,
  );
  return response.data.token;
};

const signOutUser = () => {
  localStorage.removeItem("access_token");
};

const authServices = {
  registerUser,
  loginUser,
  signOutUser,
};

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};
export const decodedToken: currentUser | null = token ? jwtDecode(token) : null;

export default authServices;
