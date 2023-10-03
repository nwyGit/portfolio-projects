package com.raymondNg.homieComb.controller;

import com.raymondNg.homieComb.model.http.auth.*;
import com.raymondNg.homieComb.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequiredArgsConstructor
@RequestMapping({"/api/v1/auth"})
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping({"/register"})
    public void register(
            @RequestBody RegisterRequest request
    ) {
        authenticationService.register(request);
    }

    @PostMapping({"/login"})
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {
        return authenticationService.login(request);
    }

    @PostMapping({"/oauth2/{provider}"})
    public LoginResponse oauth2(
            @PathVariable String provider,
            @RequestBody OAuthRequest request
            ) throws IOException, GeneralSecurityException {
        if (provider.equals("google")) {
            return authenticationService.oauthGoogleAuthenticate(request);
        }
        if (provider.equals("github")) {
            return authenticationService.oauthGithubAuthenticate(request);
        }
        return null;
    }

}
