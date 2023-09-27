"use client";

import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/Container";
import toast from "react-hot-toast";
import {
  deleteProperty,
  setProperties,
} from "../redux/reducers/propertiesReducer";

const PropertyClient = () => {
  const currentUser = useAppSelector((state) => state.user);
  const properties = useAppSelector((state) => state.properties);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const [deletingId, setDeletingId] = useState(0);

  useEffect(() => {
    if (currentUser?.username) {
      dispatch(setProperties(currentUser.username));
    }
  }, [currentUser, dispatch]);

  const onCancel = useCallback(
    async (id: number) => {
      setDeletingId(id);

      try {
        await dispatch(deleteProperty(id));
        toast.success("Property deleted");
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setDeletingId(0);
      }
    },
    [dispatch, router],
  );

  if (!currentUser?.sub) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you haven no properties."
      />
    );
  }

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
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
        {properties.map((property: any) => (
          <ListingCard
            key={property.id}
            data={property}
            actionId={property.id}
            onAction={onCancel}
            disabled={deletingId === property.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertyClient;
