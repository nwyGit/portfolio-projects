package com.raymondNg.homieComb.controller;

import com.raymondNg.homieComb.config.S3Buckets;
import com.raymondNg.homieComb.model.http.util.ImageResponse;
import com.raymondNg.homieComb.services.S3Service;
import java.io.IOException;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping({"/api/v1/util"})
public class UtilitiesController {
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    @PostMapping({"/upload-image"})
    public ResponseEntity<ImageResponse> uploadImage(
            @RequestParam("file") MultipartFile file
    ) {
        try {
            return ResponseEntity.ok(s3Service.putObject(
                    s3Buckets.getHomiecomb(),
                    file)
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
