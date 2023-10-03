package com.raymondNg.homieComb.model.http.user;

import com.raymondNg.homieComb.model.http.listing.ListingDTO;

import java.util.List;

public record UserFavoritesDTO(
        long[] ids,
        List<ListingDTO> listings
) {
}
