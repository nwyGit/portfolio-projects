package com.raymondNg.homieComb.model.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ClassName: LoginRequest
 * Package: com.raymondNg.homieComb.model.auth
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-19 15:04
 * @Version 1.0
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String email;
    String password;
}
