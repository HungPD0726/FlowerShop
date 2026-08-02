package com.flowerstore.service.impl;

import com.flowerstore.exception.BusinessException;
import com.flowerstore.service.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.UUID;

@Service
@Slf4j
public class LocalStorageServiceImpl implements StorageService {

    private final Path rootLocation;

    public LocalStorageServiceImpl(@Value("${app.upload-dir:uploads}") String uploadDir) {
        this.rootLocation = Paths.get(uploadDir);
        try {
            Files.createDirectories(this.rootLocation);
        } catch (IOException e) {
            log.error("Could not initialize storage directory", e);
        }
    }

    @Override
    public String storeFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BusinessException("File không được để trống");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            throw new BusinessException("Tên file không hợp lệ");
        }

        String fileExtension = getFileExtension(originalFilename);
        if (!isAllowedExtension(fileExtension)) {
            throw new BusinessException("Định dạng file không được hỗ trợ (chỉ chấp nhận jpg, jpeg, png, webp)");
        }

        String newFilename = UUID.randomUUID().toString() + "." + fileExtension;
        Path destinationFile = this.rootLocation.resolve(Paths.get(newFilename)).normalize().toAbsolutePath();

        if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
            throw new BusinessException("Không thể lưu file ngoài thư mục quy định");
        }

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new BusinessException("Lỗi lưu file: " + e.getMessage());
        }

        return "/uploads/" + newFilename;
    }

    @Override
    public void deleteFile(String fileUrl) {
        if (fileUrl == null || !fileUrl.startsWith("/uploads/")) {
            return;
        }
        String filename = fileUrl.replace("/uploads/", "");
        try {
            Path file = this.rootLocation.resolve(filename);
            Files.deleteIfExists(file);
        } catch (IOException e) {
            log.error("Could not delete file: {}", fileUrl, e);
        }
    }

    private String getFileExtension(String filename) {
        int lastIndexOf = filename.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        }
        return filename.substring(lastIndexOf + 1).toLowerCase();
    }

    private boolean isAllowedExtension(String extension) {
        return extension.equalsIgnoreCase("jpg") ||
               extension.equalsIgnoreCase("jpeg") ||
               extension.equalsIgnoreCase("png") ||
               extension.equalsIgnoreCase("webp");
    }
}
