package com.tutorial.apidemo.ecommerce.backend.service;

import com.tutorial.apidemo.ecommerce.backend.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> searchProducts(String keyword);

}
