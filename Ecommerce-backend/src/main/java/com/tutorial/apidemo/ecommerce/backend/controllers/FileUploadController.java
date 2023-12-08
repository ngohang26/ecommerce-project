package com.tutorial.apidemo.ecommerce.backend.controllers;

import com.tutorial.apidemo.ecommerce.backend.response.ProductResponse;
import com.tutorial.apidemo.ecommerce.backend.service.IStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "/api/FileUpload")
public class FileUploadController {
    // inject storage service here
    @Autowired
    private IStorageService storageService;
    // this controller receive file/ image from client
    @PostMapping("/uploadFile") // search
    public ResponseEntity<ProductResponse> uploadFile(@RequestParam("file")MultipartFile file) {
        try {
            // save files to a folder => use a service
            String generatedFileName = storageService.storeFile(file);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ProductResponse("ok", "upload successfully", generatedFileName)

            );
        } catch (Exception exception) {
            return  ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body (
                    new ProductResponse("ok", exception.getMessage(), "")
            );
        }
    }

    @PostMapping("/uploadMultipleFiles")
    public ResponseEntity<ProductResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        try {
            List<String> fileNames = new ArrayList<>();
            for (MultipartFile file : files) {
                String generatedFileName = storageService.storeFile(file);
                fileNames.add(generatedFileName);
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ProductResponse("ok", "upload successfully", fileNames)
            );
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body (
                    new ProductResponse("failed", exception.getMessage(), new ArrayList<>())
            );
        }
    }


    @GetMapping("/files/{fileName:.+}")
    public ResponseEntity<byte[]> readDetailFile(@PathVariable String fileName) {
        try {
            byte[] bytes = storageService.readFileContent(fileName);
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(bytes);
        } catch (Exception exception) {
            return ResponseEntity.noContent().build();
        }
    }

    // load all uploaded files
    @GetMapping("")
    public ResponseEntity<ProductResponse> getUploadedFiles() {
        try {
            List<String> urls = storageService.loadAll()
                    .map(path -> {
                        //convert fileName to url ( send request "readDetailFile)
                        String urlsPath = MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                                "readDetailFile", path.getFileName().toString()).build().toUri().toString();
                        return urlsPath;
                    })
                    .collect(Collectors.toList());
            return ResponseEntity.ok(new ProductResponse("ok", "List files successfully", urls));
        }catch (Exception exception) {
            return ResponseEntity.ok(
                    new ProductResponse("failed", "List files failed", new String[] {})
            );
        }
    }
}















