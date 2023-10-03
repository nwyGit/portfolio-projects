package com.raymondNg.homieComb.repository;

import com.raymondNg.homieComb.model.database.listing.Listing;
import com.raymondNg.homieComb.model.database.user.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long>{
    List<Listing> findListingByUser(User user, Sort sort);
    @Query(value =
            "SELECT l.* " +
            "FROM Listings l " +
            "LEFT JOIN Locations loc ON l.location_id = loc.id " +
            "WHERE " +
            "(:category IS NULL OR l.category = :category) " +
            "AND (:room IS NULL OR l.room >= :room) " +
            "AND (:bathroom IS NULL OR l.bathroom >= :bathroom) " +
            "AND (:guestAllowed IS NULL OR l.guest_allowed >= :guestAllowed) "+
            "AND (:location IS NULL OR loc.value = :location) " +
            "AND (" +
            "   cast(:startDate as Date) IS NULL OR cast(:endDate as Date) IS NULL OR " +
            "   l.id NOT IN (" +
            "       SELECT DISTINCT r.listing_id FROM Reservations r " +
            "       WHERE " +
            "       r.listing_id IS NOT NULL AND " +
            // Date range starts 1. before the reservation starts OR
            //                   2. on the same day the reservation starts
            //            AND
            //            includes the reservation dates
            "       (r.start_date >= :startDate AND r.end_date <= :endDate) OR " +
            // Date range starts 1. on the same day the reservation starts OR
            //                   2. after the reservation starts
            //            AND
            //            includes the reservation dates
            "       (r.start_date <= :startDate AND r.end_date >= :startDate) OR " +
            // Date range ends 1. on the same day the reservation ends OR
            //                 2. before the reservation ends
            //            AND
            //            includes the reservation dates
            "       (r.start_date <= :endDate AND r.end_date >= :endDate)" +
            "   )" +
            ")",
            nativeQuery = true)
    List<Listing> findAvailableListings(
            @Param("category") String category,
            @Param("room") Integer room,
            @Param("bathroom") Integer bathroom,
            @Param("guestAllowed") Integer guestAllowed,
            @Param("location") String location,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );
}