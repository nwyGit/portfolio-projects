import listingServices from "../services/listing";

interface IParams {
  listingId?: number;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    if (!listingId) {
      throw new Error("Listing ID is missing in the parameters");
    }

    const listing = await listingServices.getListingById(listingId);

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
