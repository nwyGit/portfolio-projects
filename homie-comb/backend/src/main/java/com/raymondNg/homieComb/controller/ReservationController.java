package com.raymondNg.homieComb.controller;

import com.raymondNg.homieComb.model.http.reservation.CreateReservationRequest;
import com.raymondNg.homieComb.model.http.reservation.ReservationDTO;
import com.raymondNg.homieComb.services.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping({"/api/v1/reservations"})
public class ReservationController {
    private final ReservationService reservationService;

    @GetMapping("/{listingId}")
    public List<ReservationDTO> getReservationsByListing(
            @PathVariable long listingId
    ){
        return reservationService.getReservationsByListing(listingId);
    }

    @PostMapping
    public ReservationDTO addReservation(
            @RequestBody CreateReservationRequest request
    ) throws ParseException {
        return reservationService.createNewReservation(request);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(
            @PathVariable Long id
    ) {
        reservationService.deleteReservation(id);
    }
}
