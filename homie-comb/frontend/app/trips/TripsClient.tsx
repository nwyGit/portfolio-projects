"use client";

import { toast } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { AppDispatch, useAppSelector } from "../redux/store";
import EmptyState from "../components/EmptyState";
import { useDispatch } from "react-redux";
import { deleteTrip, setTrips } from "../redux/reducers/tripsReducer";

const TripsClient = () => {
	const currentUser = useAppSelector((state) => state.user);
	const trips = useAppSelector((state) => state.trips);
	const dispatch = useDispatch<AppDispatch>();

	const router = useRouter();
	const [deletingId, setDeletingId] = useState(0);

	useEffect(() => {
		if (currentUser?.username) {
			dispatch(setTrips(currentUser.username));
		}
	}, [currentUser, dispatch]);

	const onCancel = useCallback(
		async (id: number) => {
			setDeletingId(id);

			try {
				await dispatch(deleteTrip(id));
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

	if (!currentUser?.sub) {
		return <EmptyState title="Unauthorized" subtitle="Please login" />;
	}

	if (trips.length === 0) {
		return (
			<EmptyState
				title="No trips found"
				subtitle="Looks like you haven't reserved any trips."
			/>
		);
	}

	return (
		<Container>
			<Heading
				title="Trips"
				subtitle="Where you've been and where you're going"
			/>
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
				{trips.map((reservation: any) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel="Cancel reservation"
					/>
				))}
			</div>
		</Container>
	);
};

export default TripsClient;
