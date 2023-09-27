"use client";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import ClientOnly from "./components/ClientOnly";
import { AppDispatch, useAppSelector } from "./redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeListings } from "./redux/reducers/listingsReducer";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = ({ searchParams }: HomeProps) => {
  const listings = useAppSelector((state) => state.listings);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeListings());
  }, [dispatch]);

  //await getListings(searchParams);
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: any) => (
            <ListingCard key={listing.id} data={listing} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
