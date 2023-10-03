package com.raymondNg.homieComb.services;

import com.raymondNg.homieComb.config.OAuthGithubInfo;
import com.raymondNg.homieComb.config.S3Buckets;
import com.raymondNg.homieComb.helper.PasswordGenerator;
import com.raymondNg.homieComb.model.database.user.Role;
import com.raymondNg.homieComb.model.database.user.User;
import com.raymondNg.homieComb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OAuthGithubService {
    private final S3Buckets s3Buckets;
    private final S3Service s3Service;
    private final OAuthGithubInfo OAuthGithubInfo;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User findOrCreateUser(String code) throws IOException {
        String accessToken = requestAccessToken(code);
        List<String> emails = fetchUserEmails(accessToken);
        User existingUser = emails
                .stream()
                .map(email -> userRepository.findUserByEmail(email).orElse(null))
                .filter(Objects::nonNull)
                .findFirst()
                .orElse(null);

        if (existingUser != null) {
            return existingUser;
        } else {
            return fetchAndCreateUser(accessToken, emails.get(0));
        }
    }

    private String requestAccessToken(String code) throws IOException {
        HttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(OAuthGithubInfo.getAccessTokenUrl());
        httpPost.setHeader(HttpHeaders.ACCEPT, "application/json");

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("client_id", OAuthGithubInfo.getClientId()));
        params.add(new BasicNameValuePair("client_secret", OAuthGithubInfo.getClientSecret()));
        params.add(new BasicNameValuePair("code", code));

        httpPost.setEntity(new UrlEncodedFormEntity(params));
        HttpResponse response = httpClient.execute(httpPost);

        int statusCode = response.getStatusLine().getStatusCode();

        if (statusCode == 200) {
            HttpEntity entity = response.getEntity();
            String responseBody = EntityUtils.toString(entity);
            return new JSONObject(responseBody).getString("access_token");
        }

        throw new IOException("Token exchange request failed with status code: " + statusCode);
    }

    private List<String> fetchUserEmails(String accessToken) throws IOException {
        HttpClient httpClient = HttpClients.createDefault();

        HttpGet httpGetUserEmail = new HttpGet(OAuthGithubInfo.getUserInfoUrl() + "/emails");
        httpGetUserEmail.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
        HttpResponse userEmailResponse = httpClient.execute(httpGetUserEmail);

        int userEmailStatusCode = userEmailResponse.getStatusLine().getStatusCode();

        if (userEmailStatusCode == 200) {
            String userEmailResponseBody = EntityUtils.toString(userEmailResponse.getEntity());
            return extractUserEmailFromResponse(userEmailResponseBody);
        }

        throw new IOException("GitHub API request failed with status code: " + userEmailStatusCode);
    }

    private User fetchAndCreateUser(String accessToken, String email) throws IOException {
        HttpClient httpClient = HttpClients.createDefault();

        HttpGet httpGetUserInfo = new HttpGet(OAuthGithubInfo.getUserInfoUrl());
        httpGetUserInfo.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
        HttpResponse userInfoResponse = httpClient.execute(httpGetUserInfo);

        int userInfoStatusCode = userInfoResponse.getStatusLine().getStatusCode();

        if (userInfoStatusCode == 200) {
            String userInfoResponseBody = EntityUtils.toString(userInfoResponse.getEntity());
            User newUser = createUser(userInfoResponseBody, email);
            userRepository.save(newUser);

            return newUser;
        }

        throw new IOException("GitHub API request failed with status code: " + userInfoStatusCode);
    }

    private User createUser(String userInfo, String email) {
        JSONObject userInfoObject = new JSONObject(userInfo);

        String username = userInfoObject.getString("login");
        String avatarUrl = userInfoObject.getString("avatar_url");
        String name = userInfoObject.getString("name");

        int suffix = 1;
        while (userRepository.findUserByUsername(username).isPresent()) {
            username += suffix;
            suffix++;
        }

        String avatarImageKey = s3Service.copyOAuthAvatarImage(
                s3Buckets.getHomiecomb(), avatarUrl
        );

        return User.builder()
                .username(username)
                .firstname(name)
                .lastname(name)
                .email(email)
                .password(passwordEncoder.encode(PasswordGenerator.generatePassword(12)))
                .avatar_key(avatarImageKey)
                .role(Role.USER)
                .favorites(new long[] {})
                .build();
    }

    private static List<String> extractUserEmailFromResponse(String userEmails) {
        JSONArray userEmailArray = new JSONArray(userEmails);
        List<String> emails = new ArrayList<>();

        for (int i = 0; i < userEmailArray.length(); i++) {
            JSONObject emailObj = userEmailArray.getJSONObject(i);
            String email = emailObj.getString("email");

            if (emailObj.getBoolean("primary")) {
                emails.add(0, email);
            } else {
                emails.add(email);
            }
        }

        return emails;
    }
}
