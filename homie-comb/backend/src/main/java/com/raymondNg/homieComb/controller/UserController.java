package com.raymondNg.homieComb.controller;

import com.raymondNg.homieComb.model.http.listing.ListingDTO;
import com.raymondNg.homieComb.model.http.reservation.ReservationDTO;
import com.raymondNg.homieComb.model.http.user.UserFavoritesRequest;
import com.raymondNg.homieComb.model.http.user.UserFavoritesDTO;
import com.raymondNg.homieComb.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping({"/api/v1/users"})
public class UserController {
    private final UserService userService;

    @GetMapping("/{username}/favorites")
    public UserFavoritesDTO getFavourites(
            @PathVariable String username)
    {
        return userService.getFavourites(username);
    }

    @PutMapping("/{username}/favorites")
    public void updateFavourites(
            @PathVariable String username,
            @RequestBody UserFavoritesRequest request)
    {
        userService.updateFavorites(username, request);
    }

    @GetMapping("/{username}/trips")
    public List<ReservationDTO> getTrips(
            @PathVariable String username)
    {
        return userService.getTrips(username);
    }

    @GetMapping("/{username}/reservations")
    public List<ReservationDTO> getReservations(
            @PathVariable String username)
    {
        return userService.getReservations(username);
    }

    @GetMapping("/{username}/listings")
    public List<ListingDTO> getProperties(
            @PathVariable String username)
    {
        return userService.getProperties(username);
    }

}
