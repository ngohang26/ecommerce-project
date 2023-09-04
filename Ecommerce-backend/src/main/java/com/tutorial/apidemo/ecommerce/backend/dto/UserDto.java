package com.tutorial.apidemo.ecommerce.backend.dto;

public class UserDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String phone;
    private String username;
    private String email;
    private String token;
    private String password;

    public UserDto() {
    }

    public UserDto(String firstname, String lastname, String phone, String username, String email, String token, String password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.username = username;
        this.email = email;
        this.token = token;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {return firstname;}

    public void setFirstname(String firstname) {this.firstname = firstname;}

    public String getLastname() {return lastname;}

    public void setLastname(String lastname) {this.lastname = lastname;}

    public String getPhone() {return phone;}

    public void setPhone(String phone) {this.phone = phone;}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {return token;}

    public void setToken(String token) {this.token = token;}

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
