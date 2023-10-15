package com.tutorial.apidemo.ecommerce.backend.dto;

import java.util.List;

public class OrderDto {
    private Long id;
    private List<String> products;
    private String status;
    private String userFirstName;
    private String userLastName;

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public List<String> getProducts() {return products;}

    public void setProducts(List<String> products) {this.products = products;}

    public String getStatus() {return status;}

    public void setStatus(String status) {this.status = status;}

    public String getUserFirstName() {return userFirstName;}

    public void setUserFirstName(String userFirstName) {this.userFirstName = userFirstName;}

    public String getUserLastName() {return userLastName;}

    public void setUserLastName(String userLastName) {this.userLastName = userLastName;}
}
