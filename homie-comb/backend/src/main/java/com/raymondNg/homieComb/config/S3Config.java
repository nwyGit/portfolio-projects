package com.raymondNg.homieComb.s3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

/**
 * ClassName: s3Config
 * Package: com.raymondNg.homieComb.s3
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-20 23:00
 * @Version 1.0
 */

@Configuration
public class S3Config {

    @Value("${aws.region}")
    private String awsRegion;

    @Bean
    public S3Client s3Client(){
        return S3Client.builder()
                .region(Region.of(awsRegion))
                .build();
    }
}
