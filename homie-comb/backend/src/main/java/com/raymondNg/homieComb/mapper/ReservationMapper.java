package com.raymondNg.homieComb.mapper;

import com.raymondNg.homieComb.model.database.listing.Listing;
import com.raymondNg.homieComb.model.database.reservation.Reservation;
import com.raymondNg.homieComb.model.http.listing.ListingDTO;
import com.raymondNg.homieComb.model.http.reservation.ReservationDTO;
import com.raymondNg.homieComb.model.http.user.UserDTO;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ReservationMapper implements Function<Reservation, ReservationDTO> {

    @Override
    public ReservationDTO apply(Reservation reservation){
        Listing listing = reservation.getListing();

        UserDTO userDTO = new UserDTO(
                listing.getUser().getAccountUsername(),
                listing.getUser().getAvatar_key()
        );

        ListingDTO listingDTO = new ListingDTO(
                listing.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getImageKey(),
                listing.getCategory(),
                listing.getGuest_allowed(),
                listing.getRoom(),
                listing.getBathroom(),
                listing.getPrice(),
                listing.getCategory(),
                listing.getLocation(),
                userDTO
        );

        return new ReservationDTO(
                reservation.getId(),
                reservation.getStart_date().toString(),
                reservation.getEnd_date().toString(),
                reservation.getCreatedAt().toString(),
                reservation.getTotal_price(),
                listingDTO
        );
    }
}
