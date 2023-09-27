package com.raymondNg.homieComb.model.http.listing;

import com.raymondNg.homieComb.model.database.listing.Location;
import com.raymondNg.homieComb.model.http.user.UserDTO;

import java.util.Date;

public record ListingListDTO(
         Long id,
         String title,
         String description,
         String imageKey,
         String category,
         int guestCount,
         int roomCount,
         int bathroomCount,
         int price,
         String createdAt,
         Location location,
         UserDTO user
) {
}
