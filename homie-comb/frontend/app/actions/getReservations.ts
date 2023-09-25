import reservationServices from "../services/reservation";

interface IParams {
	listingId?: number;
	username?: string;
	authorId?: string;
}

export default async function getReservations(params: IParams) {
	try {
		const { listingId, authorId } = params;

		const query: any = {};

		if (!listingId) {
			throw new Error("Listing ID is missing in the parameters");
		}

		if (authorId) {
			query.listing = { userId: authorId };
		}

		const reservations = await reservationServices.getReservationsById(
			listingId
		);

		if (!reservations) {
			return null;
		}

		return reservations;
	} catch (error: any) {
		throw new Error(error);
	}
}
