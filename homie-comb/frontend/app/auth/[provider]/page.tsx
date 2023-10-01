import oAuthAuthentication from "@/app/actions/oAuthAuthentication";
import ClientOnly from "@/app/components/ClientOnly";
import OAuthClient from "./OAuthClient";

interface IParams {
  provider?: string;
}

interface ISearchParams {
  code?: string;
}

const OAuthPage = async ({
  params,
  searchParams,
}: {
  params: IParams;
  searchParams: ISearchParams;
}) => {
  const token = await oAuthAuthentication(params, searchParams);
  return (
    <ClientOnly>
      <OAuthClient token={token} />
    </ClientOnly>
  );
};

export default OAuthPage;
