package com.raymondNg.homieComb.services;

import com.raymondNg.homieComb.exception.ResourceNotFoundException;
import com.raymondNg.homieComb.mapper.ReservationMapper;
import com.raymondNg.homieComb.model.database.listing.Listing;
import com.raymondNg.homieComb.model.database.reservation.Reservation;
import com.raymondNg.homieComb.model.database.user.User;
import com.raymondNg.homieComb.model.http.reservation.CreateReservationRequest;
import com.raymondNg.homieComb.model.http.reservation.ReservationDTO;
import com.raymondNg.homieComb.repository.ListingRepository;
import com.raymondNg.homieComb.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final UserService userService;
    private final ListingRepository listingRepository;
    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;

    public List<ReservationDTO> getReservationsByListing(long listingId) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));

        return reservationRepository.findReservationByListing(
                        listing,
                        Sort.by(
                                Sort.Direction.DESC,
                                "createdAt"
                        ))
                .stream()
                .map(reservationMapper)
                .collect(Collectors.toList());
    }

    public ReservationDTO createNewReservation(CreateReservationRequest request) throws ParseException {
        User user = userService.checkIfUserExistsOrThrow(request.email());
        Listing listing = listingRepository.findById(request.listingId())
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));

        SimpleDateFormat format = new SimpleDateFormat(
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                Locale.US
        );
        format.setTimeZone(TimeZone.getTimeZone("UTC"));

        Reservation reservation = Reservation.builder()
                .start_date(format.parse(request.startDate()))
                .end_date(format.parse(request.endDate()))
                .total_price(request.totalPrice())
                .createdAt(new Date())
                .user(user)
                .listing(listing)
                .build();

        reservationRepository.save(reservation);

        return reservationMapper.apply(reservation);
    }

    public void deleteReservation(Long id) {
        reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));

        reservationRepository.deleteById(id);
    }

}
