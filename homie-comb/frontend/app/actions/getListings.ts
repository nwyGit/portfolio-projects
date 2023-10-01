import listingServices from "../services/listing";

export interface IListingsParams {
  roomCount?: number;
  bathroomCount?: number;
  guestCount?: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      startDate,
      endDate,
    } = params;

    let query: any = {};
    let listings;

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = roomCount;
    }

    if (bathroomCount) {
      query.bathroomCount = bathroomCount;
    }
    if (guestCount) {
      query.guestCount = guestCount;
    }

    if (location) {
      query.location = location;
    }

    if (startDate && endDate) {
      query.startDate = startDate;
      query.endDate = endDate;
    }

    if (Object.keys(params).length === 0) {
      listings = await listingServices.getAllListings();
    } else {
      listings = await listingServices.getListingsWithParams(query);
    }

    if (!listings) {
      return null;
    }

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
