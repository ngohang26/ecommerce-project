package com.tutorial.apidemo.ecommerce.backend.controllers;

import com.tutorial.apidemo.ecommerce.backend.entity.Product;
import com.tutorial.apidemo.ecommerce.backend.entity.ProductSize;
import com.tutorial.apidemo.ecommerce.backend.repositories.ProductRepositories;
import com.tutorial.apidemo.ecommerce.backend.response.ProductResponse;
import com.tutorial.apidemo.ecommerce.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductRepositories productRepositories;

    @Autowired
    private ProductService productService;

    @GetMapping(path = "getAllProducts")
    public List<Product> getAllProducts() {
        return productRepositories.findByIsDeletedFalse();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepositories.findById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping(path = "/addProduct")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try {
            product.setIsDeleted(false);
            // handle images
            // Assume that 'images' is a List<String> that contains the names of the images
            List<String> imageNames = product.getImages();
            List<String> imageUrls = new ArrayList<>();
            for (String imageName : imageNames) {
                // Create a valid URL by adding the image name to your base URL
                String imageUrl = imageName;
                imageUrls.add(imageUrl);
            }
            product.setImages(imageUrls);

            // handle sizes
            List<ProductSize> sizes = product.getSizes();
            product.setSizes(sizes);
            Product savedProduct = productRepositories.save(product);
            return ResponseEntity.ok(savedProduct);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("The product already taken");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductResponse> deleteProduct(@PathVariable Long id) {
        Optional<Product> product = productRepositories.findById(id);
        if (product.isPresent()) {
            Product p = product.get();
            p.setIsDeleted(true);
            productRepositories.save(p);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ProductResponse("ok", "Delete product successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ProductResponse("failed", "Cannot find product to delete", "")
        );
    }


    @PostMapping("/undo/{id}")
    public ResponseEntity<ProductResponse> undoDelete(@PathVariable Long id) {
        Optional<Product> product = productRepositories.findById((id));
        if (product.isPresent()) {
            Product p = product.get();
            p.setIsDeleted(false);
            productRepositories.save(p);
            return ResponseEntity.status((HttpStatus.OK)).body(
                    new ProductResponse("ok", "Undo product successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ProductResponse("failed", "Cannot fond product to undo", "")
        );
    }

    @DeleteMapping("/hardDelete/{id}")
    public ResponseEntity<ProductResponse> hardDeleteProduct(@PathVariable Long id) {
        boolean exists = productRepositories.existsById(id);
        if (exists) {
            productRepositories.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ProductResponse("ok", "Delete product succesfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ProductResponse("failed", "Cannot find product to delete", "")
        );
    }

    @GetMapping(path = "/searchProducts")
    public List<Product> searchProducts(@RequestParam String keyword) {
        return productService.searchProducts(keyword);
    }
}