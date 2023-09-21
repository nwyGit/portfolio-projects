package com.raymondNg.homieComb.model.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ClassName: LoginResponse
 * Package: com.raymondNg.homieComb.model.auth
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-19 15:02
 * @Version 1.0
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String token;
}
