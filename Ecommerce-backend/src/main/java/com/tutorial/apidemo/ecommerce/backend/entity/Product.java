package com.tutorial.apidemo.ecommerce.backend.entity;

import jakarta.persistence.*;

import javax.validation.constraints.Digits;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String productName;

    @Column(nullable = false, precision = 7, scale = 2)
    @Digits(integer = 5, fraction = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false, unique = true)
    private String category;

    @Column(nullable = false)
    private float rating;

    @Column(nullable = false)
    private int sold;

    @Column(nullable = false)
    private boolean isDeleted;

    public Product() {
        this.isDeleted = false;
    }

    public Product(String productName, BigDecimal price, String image, String category, float rating, int sold, boolean isDeleted) {
        this.productName = productName;
        this.price = price;
        this.image = image;
        this.category = category;
        this.rating = rating;
        this.sold = sold;
        this.isDeleted = isDeleted;
    }

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getProductName() {return productName;}

    public void setProductName(String productName) {this.productName = productName;}

    public BigDecimal getPrice() {return price;}

    public void setPrice(BigDecimal price) {this.price = price;}

    public String getImage() {return image;}

    public void setImage(String image) {this.image = image;}

    public String getCategory() {return category;}

    public void setCategory(String category) {this.category = category;}

    public float getRating() {return rating;}

    public void setRating(float rating) {this.rating = rating;}

    public int getSold() {return sold;}

    public void setSold(int sold) {this.sold = sold;}

    public boolean getIsDeleted() {return isDeleted;}

    public void setIsDeleted(boolean isDeleted) {this.isDeleted = isDeleted;}
}
