package com.raymondNg.homieComb.s3;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * ClassName: S3Buckets
 * Package: com.raymondNg.homieComb.s3
 * Description:
 *
 * @Author Wai Yan(Raymond) Ng
 * @Create 2023-09-20 23:20
 * @Version 1.0
 */

@Configuration
@ConfigurationProperties(prefix = "aws.s3.buckets")
public class S3Buckets {
    private String homiecomb;

    public String getHomiecomb() {
        return homiecomb;
    }

    public void setHomiecomb(String homiecomb) {
        this.homiecomb = homiecomb;
    }
}
