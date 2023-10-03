package com.raymondNg.homieComb.model.http.reservation;

public record CreateReservationRequest(
        int totalPrice,
        String startDate,
        String endDate,
        String email,
        long listingId
) {
}
