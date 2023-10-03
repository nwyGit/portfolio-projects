package com.raymondNg.homieComb.services;

import com.raymondNg.homieComb.config.S3Buckets;
import com.raymondNg.homieComb.exception.DuplicateResourceException;
import com.raymondNg.homieComb.jwt.JwtUtil;
import com.raymondNg.homieComb.model.database.user.Role;
import com.raymondNg.homieComb.model.database.user.User;
import com.raymondNg.homieComb.model.http.auth.*;
import com.raymondNg.homieComb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final S3Buckets s3Buckets;
    private final S3Service s3Service;
    private final OAuthGoogleService oAuthGoogleService;
    private final OAuthGithubService oAuthGithubService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public void register(RegisterRequest request) {
        if (userRepository.findUserByUsername(request.username()).isPresent()) {
            throw new DuplicateResourceException("Username already taken");
        }
        if (userRepository.findUserByEmail(request.email()).isPresent()) {
            throw new DuplicateResourceException("Email already taken");
        }

        String avatarImageKey = s3Service.createDefaultAvatar(
                s3Buckets.getHomiecomb()
        );

        User user = User.builder()
                .username(request.username())
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .avatar_key(avatarImageKey)
                .role(Role.USER)
                .favorites(new long[] {})
                .build();

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );
        User user = userRepository.findUserByEmail(request.email()).orElseThrow();
        return jwtTokenGenerator(user);
    }

    public LoginResponse oauthGoogleAuthenticate(OAuthRequest request)
            throws IOException, GeneralSecurityException
    {
        User user = oAuthGoogleService.findOrCreateUser(request.code());
        return jwtTokenGenerator(user);
    }

    public LoginResponse oauthGithubAuthenticate(OAuthRequest request) throws IOException {
        User user = oAuthGithubService.findOrCreateUser(request.code());
        return jwtTokenGenerator(user);
    }

    private LoginResponse jwtTokenGenerator(User user) {
        String jwtToken = jwtUtil.generateToken(user);
        return LoginResponse.builder()
                .token(jwtToken)
                .build();
    }

}
