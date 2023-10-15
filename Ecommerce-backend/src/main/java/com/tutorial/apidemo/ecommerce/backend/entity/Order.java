package com.tutorial.apidemo.ecommerce.backend.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private List<String> products;

    private String status;

    @ManyToOne
    private User user;

    @Transient
    private Long userId;

    public List<String> getProducts() {return products;}

    public void setProducts(List<String> products) {this.products = products;}

    public String getStatus() {return status;}

    public void setStatus(String status) {this.status = status;}

    public User getUser() {return user;}

    public void setUser(User user) {this.user = user;}

    public Long getUserId() {return userId;}

    public void setUserId(Long userId) {this.userId = userId;}
}


