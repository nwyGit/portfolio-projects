package com.raymondNg.homieComb.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(
        prefix = "oauth.google"
)
public class OAuthGoogleInfo {
    private String accessTokenUrl;
    private String userInfoUrl;
    private String redirectURI;
    private String clientId;
    private String clientSecret;
}
