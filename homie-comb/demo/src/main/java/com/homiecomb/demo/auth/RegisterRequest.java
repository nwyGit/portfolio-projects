package com.homiecomb.demo.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ClassName: RegisterRequest
 * Package: com.example.demo.controller
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-17 14:05
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
