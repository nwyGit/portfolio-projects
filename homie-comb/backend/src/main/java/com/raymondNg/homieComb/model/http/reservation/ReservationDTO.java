package com.raymondNg.homieComb.model.http.reservation;

import com.raymondNg.homieComb.model.http.listing.ListingDTO;

public record ReservationDTO(
        long id,
        String startDate,
        String endDate,
        String createdAt,
        int totalPrice,
        ListingDTO listing
) {
}
