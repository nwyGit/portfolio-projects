package com.raymondNg.homieComb.services;

import com.raymondNg.homieComb.exception.ResourceNotFoundException;
import com.raymondNg.homieComb.mapper.ListingMapper;
import com.raymondNg.homieComb.mapper.ReservationMapper;
import com.raymondNg.homieComb.model.database.listing.Listing;
import com.raymondNg.homieComb.model.database.user.User;
import com.raymondNg.homieComb.model.http.listing.ListingDTO;
import com.raymondNg.homieComb.model.http.reservation.ReservationDTO;
import com.raymondNg.homieComb.model.http.user.UserFavoritesRequest;
import com.raymondNg.homieComb.model.http.user.UserFavoritesDTO;
import com.raymondNg.homieComb.repository.ListingRepository;
import com.raymondNg.homieComb.repository.ReservationRepository;
import com.raymondNg.homieComb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final ListingRepository listingRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ListingMapper listingMapper;
    private final ReservationMapper reservationMapper;

    public UserFavoritesDTO getFavourites(String username) {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        long[] ids = user.getFavorites();

        List<ListingDTO> listings = Arrays.stream(ids)
                .mapToObj(listingRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(listingMapper)
                .toList();

        return new UserFavoritesDTO(ids, listings);

    }

    public void updateFavorites(String username, UserFavoritesRequest request) {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setFavorites(request.newFavorites());
        userRepository.save(user);
    }

    public List<ListingDTO> getProperties(String username) {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return listingRepository.findListingByUser(
                        user,
                        Sort.by(
                                Sort.Direction.DESC,
                                "createdAt"
                        ))
                .stream()
                .map(listingMapper)
                .collect(Collectors.toList());
    }

    public User checkIfUserExistsOrThrow(String email) {
        Optional<User> userOptional = userRepository.findUserByEmail(email);

        if (userRepository.findUserByEmail(email).isEmpty()) {
            throw new ResourceNotFoundException(
                    "User with email [%s] not found".formatted(email)
            );
        }

        return userOptional.orElse(null);
    }

    public List<ReservationDTO> getReservations(String username) {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Listing> properties = listingRepository.findListingByUser(
                user,
                Sort.by(
                        Sort.Direction.DESC,
                        "createdAt"
                ));

        List<ReservationDTO> propertyReservations = new ArrayList<>();
        for (Listing property : properties) {
            List<ReservationDTO> reservations =
                    reservationRepository
                            .findReservationByListing(property, Sort.by(
                                    Sort.Direction.DESC,
                                    "createdAt")
                            )
                            .stream()
                            .map(reservationMapper)
                            .toList();
            propertyReservations.addAll(reservations);
        }

        return propertyReservations;

    }

    public List<ReservationDTO> getTrips(String username) {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return reservationRepository.findReservationByUser(
                        user,
                        Sort.by(
                                Sort.Direction.DESC,
                                "createdAt"
                        ))
                .stream()
                .map(reservationMapper)
                .collect(Collectors.toList());
    }
}
