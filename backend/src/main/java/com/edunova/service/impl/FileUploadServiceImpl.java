package com.edunova.service.impl;

import com.edunova.exception.ApiException;
import com.edunova.service.FileUploadService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileUploadServiceImpl implements FileUploadService {

    private final String uploadDir = "uploads";

    @Override
    public String uploadFile(MultipartFile file, String directory) {
        try {
            Path root = Paths.get(uploadDir, directory);
            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }

            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), root.resolve(filename));

            return "/" + directory + "/" + filename;
        } catch (IOException e) {
            throw new ApiException("Could not store file: " + e.getMessage());
        }
    }
}
