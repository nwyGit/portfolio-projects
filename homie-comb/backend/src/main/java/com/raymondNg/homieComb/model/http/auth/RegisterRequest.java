package com.raymondNg.homieComb.model.http.auth;

public record RegisterRequest(
        String username,
        String firstname,
        String lastname,
        String email,
        String password
) {
}
