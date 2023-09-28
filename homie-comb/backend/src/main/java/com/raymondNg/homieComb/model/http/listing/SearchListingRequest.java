package com.raymondNg.homieComb.model.http.listing;

public record SearchRequest(
        String category,
        int roomCount,
        int guestCount,
        int bathroomCount,
        String location,
        String startDate,
        String endDate
) {
}
