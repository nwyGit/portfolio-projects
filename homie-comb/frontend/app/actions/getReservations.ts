import reservationServices from "../services/reservation";

interface IParams {
  listingId?: number;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId } = params;

    if (!listingId) {
      throw new Error("Listing ID is missing in the parameters");
    }

    const reservations =
      await reservationServices.getReservationsByListingId(listingId);

    if (!reservations) {
      return null;
    }

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
