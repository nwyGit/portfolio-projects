package com.raymondNg.homieComb.mapper;

import com.raymondNg.homieComb.model.database.listing.Listing;
import com.raymondNg.homieComb.model.http.listing.ListingListResponse;

import java.util.function.Function;

/**
 * ClassName: ListingMapper
 * Package: com.raymondNg.homieComb.mapper
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-23 14:03
 * @Version 1.0
 */
public class ListingMapper implements Function<Listing, ListingListResponse> {
    @Override
    public ListingListResponse apply(Listing listing){
        return new ListingListResponse(
                listing.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getImageKey(),
                listing.getCategory(),
                listing.getRoom(),
                listing.getBathroom(),
                listing.getGuest_allowed(),
                listing.getPrice(),
                listing.getCreatedAt(),
                listing.getLocation(),
                listing.getUser().getId()
        );
    }
}
