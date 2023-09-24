package com.raymondNg.homieComb.model.http.reservation;

import java.util.Date;

public record AddReservationRequest(
        int totalPrice,
        Date startDate,
        Date endDate,
        String email,
        long listingId
) {
}
