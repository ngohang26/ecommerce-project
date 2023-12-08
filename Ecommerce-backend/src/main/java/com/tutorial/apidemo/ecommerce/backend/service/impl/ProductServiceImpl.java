package com.tutorial.apidemo.ecommerce.backend.service.impl;

import com.tutorial.apidemo.ecommerce.backend.entity.Product;
import com.tutorial.apidemo.ecommerce.backend.repositories.ProductRepositories;
import com.tutorial.apidemo.ecommerce.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepositories productRepositories;

    @Override
    public List<Product> searchProducts(String keyword) {
        return productRepositories.findByProductNameContaining(keyword);
    }
}