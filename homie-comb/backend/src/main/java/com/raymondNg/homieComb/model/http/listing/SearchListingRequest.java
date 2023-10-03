package com.raymondNg.homieComb.model.http.listing;

import org.springframework.lang.Nullable;

public record SearchListingRequest(
        @Nullable String category,
        @Nullable int roomCount,
        @Nullable int bathroomCount,
        @Nullable int guestCount,
        @Nullable String location,
        @Nullable String startDate,
        @Nullable String endDate
) {
}
