package com.tutorial.apidemo.ecommerce.backend.entity;

import com.tutorial.apidemo.ecommerce.backend.entity.Product;
import jakarta.persistence.*;

@Entity
@Table(name = "product_sizes")
public class ProductSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String size;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}