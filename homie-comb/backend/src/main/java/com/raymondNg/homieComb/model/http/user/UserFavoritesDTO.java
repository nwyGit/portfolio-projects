package com.raymondNg.homieComb.model.http.user;

import com.raymondNg.homieComb.model.http.listing.ListingListDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserFavoritesResponse {
    long[] ids;
    List<ListingListDTO> listings;
}
