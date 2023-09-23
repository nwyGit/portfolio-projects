import axios from "axios";

import { Credentials, userForm } from "../types";

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

export default authServices;
