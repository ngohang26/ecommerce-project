package com.tutorial.apidemo.ecommerce.backend.repositories;

import com.tutorial.apidemo.ecommerce.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
@EnableJpaRepositories
@Repository
public interface ProductRepositories extends JpaRepository<Product, Long > {
    List<Product> findAll();

    List<Product> findByProductNameContaining(String keyword);

    List<Product> findByIsDeletedFalse();
}
