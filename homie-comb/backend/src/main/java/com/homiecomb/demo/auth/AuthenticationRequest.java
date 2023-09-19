package com.homiecomb.demo.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ClassName: AuthenticationRequest
 * Package: com.example.demo.controller
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-17 14:06
 * @Version 1.0
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    private String email;
    String password;
}
