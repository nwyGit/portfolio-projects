package com.raymondNg.homieComb.repository;

import com.raymondNg.homieComb.model.database.listing.Location;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findLocationByValue(String value);
}
