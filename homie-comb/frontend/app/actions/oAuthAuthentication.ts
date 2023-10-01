import authServices from "../services/auth";

interface IParams {
  provider?: string;
  code?: string;
}

interface ISearchParams {
  code?: string;
}

export default async function oAuthAuthentication(
  params: IParams,
  searchParams: ISearchParams,
) {
  try {
    const { provider } = params;
    const { code } = searchParams;

    if (!provider) {
      throw new Error("Provider is missing in the parameters");
    }

    if (!code) {
      throw new Error("Code is missing in the parameters");
    }

    return await authServices.loginWithOAuth(provider, code);
  } catch (error: any) {
    throw new Error(error);
  }
}
