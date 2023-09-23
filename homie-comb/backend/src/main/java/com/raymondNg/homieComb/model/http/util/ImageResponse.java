package com.raymondNg.homieComb.model.http.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ClassName: ImageResponse
 * Package: com.raymondNg.homieComb.model.http.auth
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-21 15:39
 * @Version 1.0
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageResponse {
    private String objectKey;
    private String url;
}
