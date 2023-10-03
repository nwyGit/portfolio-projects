package com.raymondNg.homieComb.mapper;

import com.raymondNg.homieComb.model.database.listing.Listing;
import com.raymondNg.homieComb.model.http.listing.ListingDTO;
import com.raymondNg.homieComb.model.http.user.UserDTO;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ListingMapper implements Function<Listing, ListingDTO> {
    @Override
    public ListingDTO apply(Listing listing){
        UserDTO user = new UserDTO(
                listing.getUser().getAccountUsername(),
                listing.getUser().getAvatar_key()
        );

        return new ListingDTO(
                listing.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getImageKey(),
                listing.getCategory(),
                listing.getGuest_allowed(),
                listing.getRoom(),
                listing.getBathroom(),
                listing.getPrice(),
                listing.getCreatedAt().toString(),
                listing.getLocation(),
                user
        );
    }

}
