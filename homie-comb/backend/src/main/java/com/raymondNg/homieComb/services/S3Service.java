package com.raymondNg.homieComb.services;

import com.raymondNg.homieComb.helper.ImageUpload;
import com.raymondNg.homieComb.model.http.util.ImageResponse;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;

import java.nio.ByteBuffer;
import java.time.Duration;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CopyObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

@Service
@RequiredArgsConstructor
public class S3Service {
    private final S3Client s3Client;
    private final S3Presigner s3Presigner;

    public ImageResponse putObject(String bucketName, MultipartFile file) throws IOException {
        if (!file.isEmpty()) {
            String uuid = UUID.randomUUID().toString();
            String contentType = file.getContentType();

            if (!"image/jpeg".equals(contentType) && !"image/png".equals(contentType)) {
                throw new IOException("Unsupported file type. Please upload a JPEG or PNG image.");
            } else {
                String extension = "image/jpeg".equals(contentType) ? ".jpeg" : ".png";
                String objectKey = "temp/images/%s".formatted(uuid).concat(extension);
                PutObjectRequest objectRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(objectKey)
                        .contentType(contentType)
                        .build();

                s3Client.putObject(objectRequest, RequestBody.fromBytes(file.getBytes()));
                String filename = objectKey.substring(objectKey.lastIndexOf('/') + 1);

                return new ImageResponse(
                        filename,
                        getPresignedUrl(this.s3Presigner, bucketName, objectKey)
                );
            }
        } else {
            throw new IOException("File is empty.");
        }
    }

    public String copyObjectAndDeleteTemp(String bucketName, String key) {
        String uuid = UUID.randomUUID().toString();
        String extension = key.substring(key.lastIndexOf('.'));
        String oldKey = "temp/images/%s".formatted(key);
        String newKey = "images/listings/%s".formatted(uuid).concat(extension);

        CopyObjectRequest copyRequest = CopyObjectRequest.builder()
                .sourceBucket(bucketName)
                .sourceKey(oldKey)
                .destinationBucket(bucketName)
                .destinationKey(newKey)
                .build();

        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(oldKey)
                .build();

        try {
            s3Client.copyObject(copyRequest);
            s3Client.deleteObject(deleteObjectRequest);
            return uuid.concat(extension);
        } catch (S3Exception s3Exception) {
            System.err.println(s3Exception.awsErrorDetails().errorMessage());
            return "";
        }
    }

    public String getPresignedUrl(S3Presigner presigner, String bucketName, String key) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest
                .builder()
                .signatureDuration(Duration.ofMinutes(10))
                .getObjectRequest(getObjectRequest)
                .build();

        PresignedGetObjectRequest presignedGetObjectRequest = presigner.presignGetObject(getObjectPresignRequest);
        return presignedGetObjectRequest.url().toString();

    }

    public String createDefaultAvatar(String bucketName) {
        String uuid = UUID.randomUUID().toString();
        String newKey = "images/avatars/%s".formatted(uuid).concat(".jpg");

        CopyObjectRequest copyRequest = CopyObjectRequest.builder()
                .sourceBucket(bucketName)
                .sourceKey("images/avatar_default.jpg")
                .destinationBucket(bucketName)
                .destinationKey(newKey)
                .build();

        try {
            s3Client.copyObject(copyRequest);
            return uuid.concat(".jpg");
        } catch (S3Exception s3Exception) {
            System.err.println(s3Exception.awsErrorDetails().errorMessage());
        }
        return "";
    }

    public String copyOAuthAvatarImage(String bucketName, String imageUrl) {
        String uuid = UUID.randomUUID().toString();

        try(CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpGet httpGet = new HttpGet(URI.create(imageUrl));
            try (CloseableHttpResponse response = httpClient.execute(httpGet)) {
                if (response.getStatusLine().getStatusCode() == 200) {
                    InputStream inputStream = response.getEntity().getContent();
                    ByteBuffer imageBuffer = ByteBuffer.wrap(inputStream.readAllBytes());

                    PutObjectRequest objectRequest = PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key("images/avatars/%s".formatted(uuid))
                            .contentType(ImageUpload.guessContentType(imageBuffer))
                            .build();

                    s3Client.putObject(objectRequest, RequestBody.fromByteBuffer(imageBuffer));
                    return uuid;
                }

                throw new RuntimeException("Failed to download the avatar from the OAuth provider. Status code: "
                        + response.getStatusLine().getStatusCode());

            }
        } catch (S3Exception s3Exception) {
            System.err.println(s3Exception.awsErrorDetails().errorMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return "";
    }

    public void DeleteObject(String bucketName, String key) {
        String oldKey = "images/listings/%s".formatted(key);

        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(oldKey)
                .build();

        try {
            s3Client.deleteObject(deleteObjectRequest);
        } catch (S3Exception s3Exception) {
            System.err.println(s3Exception.awsErrorDetails().errorMessage());
        }
    }

}
