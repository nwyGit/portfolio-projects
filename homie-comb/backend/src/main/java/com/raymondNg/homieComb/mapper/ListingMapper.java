package com.raymondNg.homieComb.mapper;

import com.raymondNg.homieComb.model.database.listing.Listing;
import com.raymondNg.homieComb.model.http.listing.ListingListDTO;
import com.raymondNg.homieComb.model.http.user.UserDTO;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ListingDTOMapper implements Function<Listing, ListingListDTO> {
    @Override
    public ListingListDTO apply(Listing listing){
        UserDTO user = new UserDTO(
                listing.getUser().getAccountUsername(),
                listing.getUser().getAvatar_key()
        );

        return new ListingListDTO(
                listing.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getImageKey(),
                listing.getCategory(),
                listing.getRoom(),
                listing.getBathroom(),
                listing.getGuest_allowed(),
                listing.getPrice(),
                listing.getCreatedAt().toString(),
                listing.getLocation(),
                user
        );
    }
}
