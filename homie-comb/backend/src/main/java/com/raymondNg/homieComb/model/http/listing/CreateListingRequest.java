package com.raymondNg.homieComb.model.http.listing;

import com.raymondNg.homieComb.model.database.listing.Location;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ClassName: CreateRequest
 * Package: com.raymondNg.homieComb.model.http.listing
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-22 15:34
 * @Version 1.0
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateRequest {
    private String title;
    private String description;
    private String imageKey;
    private String category;
    private int roomCount;
    private int bathroomCount;
    private int guestCount;
    private int price;
    private String location;
    private String email;
}
