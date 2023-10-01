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

const loginWithOAuth = async (provider: string, code: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth2/${provider}`,
    { code },
  );
  return response.data.token;
};

const authenticateWithGoogle = async () => {
  
};

const authenticateWithGithub = async () => {
  const oauthURL = new URL("https://github.com/login/oauth/authorize");
  const clientId = process.env.GITHUB_CLIENT_ID;
  const scope = "read:user user:email";

  oauthURL.searchParams.append("client_id", clientId as string);
  oauthURL.searchParams.append("scope", scope);

  window.location.assign(oauthURL.toString());
};

const signOutUser = () => {
  localStorage.removeItem("access_token");
};

const authServices = {
  registerUser,
  loginUser,
  loginWithOAuth,
  authenticateWithGoogle,
  authenticateWithGithub,
  signOutUser,
};

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};
export const decodedToken: currentUser | null = token ? jwtDecode(token) : null;

export default authServices;
