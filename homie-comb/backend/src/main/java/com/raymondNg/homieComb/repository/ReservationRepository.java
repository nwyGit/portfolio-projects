package com.raymondNg.homieComb.repository;

import com.raymondNg.homieComb.model.database.listing.Listing;
import com.raymondNg.homieComb.model.database.reservation.Reservation;
import com.raymondNg.homieComb.model.database.user.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findReservationByListing(Listing listing, Sort sort);
    List<Reservation> findReservationByUser(User user, Sort sort);
}
