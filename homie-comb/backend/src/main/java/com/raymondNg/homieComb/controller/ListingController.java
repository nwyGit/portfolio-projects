package com.raymondNg.homieComb.controller;

import com.raymondNg.homieComb.model.http.listing.CreateListingRequest;
import com.raymondNg.homieComb.model.http.listing.ListingDTO;
import com.raymondNg.homieComb.model.http.listing.SearchListingRequest;
import com.raymondNg.homieComb.services.ListingService;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping({"/api/v1/listings"})
public class ListingController {
    private final ListingService listingService;

    @GetMapping
    public List<ListingDTO> getAllListings() {
        return listingService.getAllListings();
    }

    @GetMapping("/search")
    public List<ListingDTO> getListingsWithParams(
            SearchListingRequest request
    ) throws ParseException {
        return listingService.getListingsWithParams(request);
    }

    @GetMapping("/{listingId}")
    public ListingDTO getListingById(
            @PathVariable long listingId
    ) {
        return listingService.getListingById(listingId);
    }

    @PostMapping
    public ListingDTO createNewListing(
            @RequestBody CreateListingRequest request
    ) throws IOException {
        return listingService.createNewListing(request);
    }

    @DeleteMapping("/{id}")
    public void deleteListing(
            @PathVariable Long id
    ) throws IOException {
        listingService.deleteListing(id);
    }

}
