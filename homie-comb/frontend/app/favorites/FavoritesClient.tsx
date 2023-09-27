"use client";

import ClientOnly from "@/app/components/ClientOnly";
import { AppDispatch, useAppSelector } from "../redux/store";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFavorites } from "../redux/reducers/favoritesReducer";

const FavoritesClient = () => {
  const currentUser = useAppSelector((state) => state.user);
  const favoriteListings = useAppSelector((state) => state.favoriteListings);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (currentUser?.username) {
      dispatch(setFavorites(currentUser.username));
    }
  }, [currentUser, dispatch]);

  if (!currentUser?.sub) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />;
      </ClientOnly>
    );
  }

  if (favoriteListings.listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <Heading title="Favorites" subtitle="List of places you favorited!" />
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
          {favoriteListings.listings.map((listing: any) => (
            <ListingCard key={listing.id} data={listing} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default FavoritesClient;
