package com.raymondNg.homieComb.model.http.reservation;

import com.raymondNg.homieComb.model.database.listing.Listing;
import com.raymondNg.homieComb.model.http.listing.ListingDTO;

public record ReservationListDTO(
        long id,
        String startDate,
        String endDate,
        String createdAt,
        int totalPrice,
        ListingDTO listing
) {
}
