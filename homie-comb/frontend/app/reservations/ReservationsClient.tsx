"use client";

import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "../components/EmptyState";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import reservationServices from "../services/reservation";
import { deleteUserReservations } from "../reducers/userReducer";

const ReservationsClient = () => {
	const currentUser = useAppSelector((state) => state.user);
	const dispatch = useDispatch<AppDispatch>();

	const router = useRouter();
	const [deletingId, setDeletingId] = useState(0);

	const onCancel = useCallback(
		async (id: number) => {
			setDeletingId(id);

			try {
				await reservationServices.deleteReservation(id);
				dispatch(deleteUserReservations(id));
				toast.success("Reservation cancelled");
				router.refresh();
			} catch (error) {
				toast.error("Something went wrong");
			} finally {
				setDeletingId(0);
			}
		},
		[dispatch, router]
	);

	if (!currentUser) {
		return <EmptyState title="Unauthorized" subtitle="Please login" />;
	}

	if (currentUser.reservations.length === 0) {
		return (
			<EmptyState
				title="No reservations found"
				subtitle="Looks like you have no reservations on your properties."
			/>
		);
	}

	return (
		<Container>
			<Heading title="Reservations" subtitle="Bookings on your properties" />
			<div
				className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
			>
				{currentUser.reservations.map((reservation: any) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel="Cancel guest reservation"
					/>
				))}
			</div>
		</Container>
	);
};

export default ReservationsClient;
