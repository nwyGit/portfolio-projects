import axios from "axios";

import { Credentials, currentUser, userForm } from "../types";
import jwtDecode from "jwt-decode";
import { generateRandomBytes } from "../helpers/randomBytes";

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
  const oauthURL = new URL(process.env.GOOGLE_OAUTH_URL as string);
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirect_uri = process.env.GOOGLE_OAUTH_REDIRECT_URI;
  const response_type = "code";
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  oauthURL.searchParams.append("client_id", clientId as string);
  oauthURL.searchParams.append("redirect_uri", redirect_uri as string);
  oauthURL.searchParams.append("response_type", response_type as string);
  oauthURL.searchParams.append("scope", scopes.join(" "));
  oauthURL.searchParams.append("state", generateRandomBytes());

  window.location.assign(oauthURL.toString());
};

const authenticateWithGithub = async () => {
  const oauthURL = new URL(process.env.GITHUB_OAUTH_URL as string);
  const clientId = process.env.GITHUB_CLIENT_ID;
  const scope = "read:user user:email";

  oauthURL.searchParams.append("client_id", clientId as string);
  oauthURL.searchParams.append("scope", scope);
  oauthURL.searchParams.append("state", generateRandomBytes());

  window.location.assign(oauthURL.toString());
};

const signOutUser = async () => {
  localStorage.clear();
};

const authServices = {
  registerUser,
  loginUser,
  loginWithOAuth,
  authenticateWithGoogle,
  authenticateWithGithub,
  signOutUser,
};

const extractToken: () => string | null = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token") as string;
  }
  return null;
};

export const config = () => {
  if (typeof window !== "undefined") {
    return {
      headers: { Authorization: `Bearer ${extractToken()}` },
    };
  }
  return null;
};

export const decodedToken: () => currentUser | null = () => {
  return extractToken() ? jwtDecode(extractToken() as string) : null;
};

export default authServices;
