import reservationServices from "../services/reservation";

interface IParams {
  listingId?: number;
  userId?: number;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    return await reservationServices.getAllReservations(query);
  } catch (error: any) {
    throw new Error(error);
  }
}
