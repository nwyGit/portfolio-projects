package com.raymondNg.homieComb.services;

import com.raymondNg.homieComb.config.S3Buckets;
import com.raymondNg.homieComb.exception.ResourceNotFoundException;
import com.raymondNg.homieComb.mapper.ListingMapper;
import com.raymondNg.homieComb.model.database.listing.Listing;
import com.raymondNg.homieComb.model.database.listing.Location;
import com.raymondNg.homieComb.model.database.listing.LocationInfo;
import com.raymondNg.homieComb.model.database.user.User;
import com.raymondNg.homieComb.model.http.listing.CreateListingRequest;
import com.raymondNg.homieComb.model.http.listing.ListingDTO;
import com.raymondNg.homieComb.model.http.listing.SearchListingRequest;
import com.raymondNg.homieComb.repository.ListingRepository;
import com.raymondNg.homieComb.repository.LocationRepository;
import com.raymondNg.homieComb.repository.UserRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListingService {
    private final S3Buckets s3Buckets;
    private final S3Service s3Service;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final LocationRepository locationRepository;
    private final ListingMapper listingMapper;

    public List<ListingDTO> getAllListings() {
        return listingRepository.findAll(
                Sort.by(
                        Sort.Direction.DESC,
                        "createdAt"
                ))
                .stream()
                .map(listingMapper)
                .toList();
    }

    public ListingDTO getListingById(long listingId) {
        return listingRepository.findById(listingId)
                .map(listingMapper)
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Listing with id [%s] not found".formatted(listingId)
                ));
    }

    public List<ListingDTO> getListingsWithParams(SearchListingRequest request) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat(
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                Locale.US
        );
        format.setTimeZone(TimeZone.getTimeZone("UTC"));

        Date startDate = (request.startDate() != null) ? format.parse(request.startDate()) : null;
        Date endDate = (request.endDate() != null) ? format.parse(request.endDate()) : null;

        return listingRepository.findAvailableListings(
                request.category(),
                request.roomCount(),
                request.bathroomCount(),
                request.guestCount(),
                request.location(),
                startDate,
                endDate)
                .stream()
                .map(listingMapper)
                .toList();

    }

    public ListingDTO createNewListing(CreateListingRequest request) {
        User user = userRepository.findUserByEmail(request.email())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String newImageKey = s3Service.copyObjectAndDeleteTemp(
                s3Buckets.getHomiecomb(),
                request.imageKey()
        );

        Optional<Location> location = locationRepository.findLocationByValue(request.location());
        LocationInfo locationInfo = LocationInfo.valueOf(request.location());

        Location locationToBeAdded = location.orElseGet(() -> Location.builder()
                .flag(locationInfo.getFlag())
                .label(locationInfo.getLabel())
                .latlng(locationInfo.getLatlng())
                .region(locationInfo.getRegion())
                .value(locationInfo.getValue())
                .build());

        locationRepository.save(locationToBeAdded);

        Listing listing = Listing.builder()
                .title(request.title())
                .description(request.description())
                .imageKey(newImageKey)
                .category(request.category())
                .room(request.roomCount())
                .bathroom(request.bathroomCount())
                .guest_allowed(request.guestCount())
                .price(request.price())
                .location(locationToBeAdded)
                .user(user)
                .createdAt(new Date())
                .build();

        listingRepository.save(listing);

        return listingMapper.apply(listing);
    }

    public void deleteListing(Long id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));

        s3Service.DeleteObject(
                s3Buckets.getHomiecomb(),
                listing.getImageKey()
        );

        listingRepository.deleteById(id);
    }

}
