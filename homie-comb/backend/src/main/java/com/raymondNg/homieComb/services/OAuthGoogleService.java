package com.raymondNg.homieComb.services;

import com.google.api.client.auth.oauth2.TokenResponseException;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.raymondNg.homieComb.config.OAuthGoogleInfo;
import com.raymondNg.homieComb.config.S3Buckets;
import com.raymondNg.homieComb.helper.PasswordGenerator;
import com.raymondNg.homieComb.model.database.user.Role;
import com.raymondNg.homieComb.model.database.user.User;
import com.raymondNg.homieComb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class OAuthGoogleService {
    private final S3Buckets s3Buckets;
    private final S3Service s3Service;
    private final OAuthGoogleInfo OAuthGoogleInfo;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User findOrCreateUser(String code) throws IOException, GeneralSecurityException {
        String idToken = requestIdToken(code);
        GoogleIdToken.Payload payload = extractUserInfoFromToken(idToken);
        User existingUser = userRepository.findUserByEmail(payload.getEmail()).orElse(null);

        if (existingUser != null) {
            return existingUser;
        } else {
            User newUser = createUser(payload);
            userRepository.save(newUser);
            return newUser;
        }
    }

    private String requestIdToken(String code) throws IOException {
        try {
            GoogleTokenResponse response = new GoogleAuthorizationCodeTokenRequest(
                    new NetHttpTransport(), new GsonFactory(),
                    OAuthGoogleInfo.getClientId(), OAuthGoogleInfo.getClientSecret(),
                    code, OAuthGoogleInfo.getRedirectURI())
                    .execute();
            return response.getIdToken();
        } catch (TokenResponseException e) {
            if (e.getDetails() != null) {
                System.err.println("Error: " + e.getDetails().getError());
                if (e.getDetails().getErrorDescription() != null) {
                    System.err.println(e.getDetails().getErrorDescription());
                }
                if (e.getDetails().getErrorUri() != null) {
                    System.err.println(e.getDetails().getErrorUri());
                }
            } else {
                System.err.println(e.getMessage());
            }
        }

        return null;
    }

    public GoogleIdToken.Payload extractUserInfoFromToken(String idTokenString) throws IOException, GeneralSecurityException {
        NetHttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new GsonFactory();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(OAuthGoogleInfo.getClientId()))
                .build();

        GoogleIdToken idToken = verifier.verify(idTokenString);

        if (idToken != null) {
            return idToken.getPayload();
        }

        throw new IOException("Invalid ID token.");
    }

    private User createUser(GoogleIdToken.Payload payload) {
        String username = (String) payload.get("name");
        String firstname = (String) payload.get("given_name");
        String lastname = (String) payload.get("family_name");
        String email = payload.getEmail();
        String pictureUrl = (String) payload.get("picture");

        int suffix = 1;
        while (userRepository.findUserByUsername(username).isPresent()) {
            username += suffix;
            suffix++;
        }

        String avatarImageKey = s3Service.copyOAuthAvatarImage(
                s3Buckets.getHomiecomb(), pictureUrl
        );

        return User.builder()
                .username(username)
                .firstname(firstname != null ? firstname : username)
                .lastname(lastname != null ? lastname : username)
                .email(email)
                .password(passwordEncoder.encode(PasswordGenerator.generatePassword(12)))
                .avatar_key(avatarImageKey)
                .role(Role.USER)
                .favorites(new long[] {})
                .build();
    }

}
