package com.tutorial.apidemo.ecommerce.backend.service.impl;

import com.tutorial.apidemo.ecommerce.backend.service.IStorageService;
import com.tutorial.apidemo.ecommerce.backend.service.ProductService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.UUID;
import java.util.stream.Stream;

@Service // day la  1 service
public class ImageStorageService implements IStorageService {
    private final Path storageFolder = Paths.get("uploads");  // thuoc tinh tham chieu den upload image
    // constructor
    public ImageStorageService() {
        try {
            Files.createDirectories(storageFolder);
        } catch (IOException exception) {
            throw new RuntimeException("Cannot initialize storage", exception);
        }
    }
    private boolean isImageFile(MultipartFile file) {
        // let install FileNameUtils
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        return Arrays.asList(new String[] {"png", "jpeg", "jpg", "jpe", "bmp"})
                .contains(fileExtension.trim().toLowerCase()); // kiem tra duoi
    }
    @Override
    public String storeFile(MultipartFile file) {
        try {
            System.out.println("Hello");
            if (file.isEmpty()) {
                throw new RuntimeException("Failed to store empty file.");
            }

            // check file is image
            if (!isImageFile(file)) {
                throw new RuntimeException("You can only upload image file.");
            }
            // file must be <= 5mb, yeu cau dung luong file
            float fileSizeInMegabytes = file.getSize() / 1_000_000.0f;
            if (fileSizeInMegabytes > 5.0f) {
                throw new RuntimeException("File must be <= 5mk");
            }

            // file must be rename ? why? khi upload 2 file co ten giong nhau 1 file cu xoa be ghi de roi xoa mat | quan trong
            String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
            String generatedFileName = UUID.randomUUID().toString() .replace("-", "");
            generatedFileName = generatedFileName + "." + fileExtension;
            Path destinationFilePath = this.storageFolder.resolve(
                    Paths.get(generatedFileName)).normalize().toAbsolutePath();
            if (!destinationFilePath.getParent().equals(this.storageFolder.toAbsolutePath())) {
                throw new RuntimeException("Can not store file outside current directory.");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFilePath, StandardCopyOption.REPLACE_EXISTING);
            }
            return generatedFileName;
        }
        catch (IOException exception) {
            throw new RuntimeException("Failed to store files.", exception);
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try{
            return Files.walk(this.storageFolder, 1)
                    .filter(path -> !path.equals(this.storageFolder))
                    .map(this.storageFolder::relativize);
        } catch (IOException exception) {
            throw new RuntimeException("Failed to loaf stores files", exception);
        }
    }


    @Override
    public byte[] readFileContent(String fileName) {
        try {
            Path file = storageFolder.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
                return bytes;
            }
            else {
                throw new RuntimeException(
                        "Could not read file: " + fileName
                );
            }
        }
        catch (IOException exception) {
            throw new RuntimeException("Could not read file: " + fileName, exception);
        }
    }

    @Override
    public void deleteAllFiles() {

    }
}
