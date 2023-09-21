package com.raymondNg.homieComb.model.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ClassName: RegisterRequest
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
public class RegisterRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
