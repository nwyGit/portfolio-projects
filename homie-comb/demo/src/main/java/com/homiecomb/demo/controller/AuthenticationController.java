package com.homiecomb.demo.controller;

import com.homiecomb.demo.auth.AuthenticationRequest;
import com.homiecomb.demo.auth.AuthenticationResponse;
import com.homiecomb.demo.auth.RegisterRequest;
import com.homiecomb.demo.security.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ClassName: AuthenticationController
 * Package: com.example.demo.controller
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-17 14:00
 * @Version 1.0
 */

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
