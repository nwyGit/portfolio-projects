package com.raymondNg.homieComb.model.database.listing;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Location")
@Table(
        name = "Locations",
        uniqueConstraints = {
                @UniqueConstraint(name = "label_unique", columnNames = {"label"}),
                @UniqueConstraint(name = "value_unique", columnNames = {"value"})}
)
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "flag")
    private String flag;

    @Column(name = "label", nullable = false)
    private String label;

    @Column(name = "latlng", nullable = false, columnDefinition = "double precision[]")
    private double[] latlng;

    @Column(name = "region", nullable = false)
    private String region;

    @Column(name = "value", nullable = false)
    private String value;

    @OneToMany(mappedBy = "location", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Listing> listings;

}
