package com.raymondNg.homieComb.model.http.listing;

public record CreateListingRequest(
        String title,
        String description,
        String imageKey,
        String category,
        int roomCount,
        int bathroomCount,
        int guestCount,
        int price,
        String location,
        String email
) {
}
