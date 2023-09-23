package com.raymondNg.homieComb.model.http.listing;

import com.raymondNg.homieComb.model.database.listing.Location;

import java.util.Date;

public record ListingListDTOResponse(
         Long id,
         String title,
         String description,
         String imageKey,
         String category,
         int room,
         int bathroom,
         int guest_allowed,
         int price,
         Date createdAt,
         Location location,
         Long user_id
) {
}
