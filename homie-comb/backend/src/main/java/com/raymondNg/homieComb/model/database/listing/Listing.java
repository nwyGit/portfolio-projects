package com.raymondNg.homieComb.model.database.listing;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.raymondNg.homieComb.model.database.reservation.Reservation;
import com.raymondNg.homieComb.model.database.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Listing")
@Table(
        name = "Listings",
        uniqueConstraints = {
                @UniqueConstraint(name = "imageKey_unique", columnNames = {"imageKey"})
        }
)
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "imageKey", nullable = false)
    private String imageKey;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "room", nullable = false)
    private int room;

    @Column(name = "bathroom", nullable = false)
    private int bathroom;

    @Column(name = "guest_allowed", nullable = false)
    private int guest_allowed;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Reservation> reservations;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
