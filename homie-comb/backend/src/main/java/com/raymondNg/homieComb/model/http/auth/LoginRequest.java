package com.raymondNg.homieComb.model.http.auth;

public record LoginRequest(
        String email,
        String password
) {
}
