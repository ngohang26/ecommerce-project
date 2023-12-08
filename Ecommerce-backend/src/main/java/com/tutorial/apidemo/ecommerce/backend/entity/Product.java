package com.tutorial.apidemo.ecommerce.backend.entity;

import jakarta.persistence.*;

import javax.validation.constraints.Digits;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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

    @Column(nullable = false, unique = true)
    private String category;

    @Column(nullable = false)
    private float rating;

    @Column(nullable = false)
    private int sold;

    @Column(nullable = false)
    private boolean isDeleted;

    @Column(nullable = false)
    private String thumbnail;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image")
    private List<String> images;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductSize> sizes;

    public Product() {
        this.isDeleted = false;
        this.images = new ArrayList<>();    }

    public Product(String productName, BigDecimal price, String image, String category, float rating, int sold, boolean isDeleted, String thumbnail, List<String> images, List<ProductSize> sizes) {
        this.productName = productName;
        this.price = price;
        this.category = category;
        this.rating = rating;
        this.sold = sold;
        this.isDeleted = isDeleted;
        this.thumbnail = thumbnail;
        this.images = images;
        this.sizes = sizes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public int getSold() {
        return sold;
    }

    public void setSold(int sold) {
        this.sold = sold;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<ProductSize> getSizes() {return sizes;}

    public void setSizes(List<ProductSize> sizes) {this.sizes = sizes;}
}