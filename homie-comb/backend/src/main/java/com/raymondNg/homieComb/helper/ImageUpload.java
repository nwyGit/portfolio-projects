package com.raymondNg.homieComb.helper;

import java.nio.ByteBuffer;

public class ImageUpload {
    public static String guessContentType(ByteBuffer byteBuffer) {
        byte[] bytes = byteBuffer.array();

        if (bytes.length >= 4 && bytes[0] == (byte) 0xFF && bytes[1] == (byte) 0xD8 && bytes[2] == (byte) 0xFF) {
            return "image/jpeg";
        } else if (bytes.length >= 4 && bytes[0] == (byte) 0x89 && bytes[1] == (byte) 0x50 && bytes[2] == (byte) 0x4E && bytes[3] == (byte) 0x47) {
            return "image/png";
        } else if (bytes.length >= 2 && bytes[0] == (byte) 0x42 && bytes[1] == (byte) 0x4D) {
            return "image/bmp";
        } else if (bytes.length >= 2 && bytes[0] == (byte) 0x47 && bytes[1] == (byte) 0x49) {
            return "image/gif";
        } else {
            return "application/octet-stream";
        }
    }
}
