package com.tutorial.apidemo.ecommerce.backend.response;

public class LoginResponse {
    String message;
    Boolean status;
    private String role;
    private String username;
    private String token;
    private Long userId;

    public LoginResponse(String message, Boolean status, String role, String username, String token) {
        this.message = message;
        this.status = status;
        this.role = role;
        this.username = username;
        this.token = token;
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {return username;}

    public void setUsername(String username) {this.username = username;}

    public String getToken() {return token;}

    public void setToken(String token) {this.token = token;}

    public Long getUserId() {return userId;}

    public void setUserId(Long userId) {this.userId = userId;}

    @Override
    public String toString() {
        return "LoginResponse{" +
                "message='" + message + '\'' +
                ", status=" + status +
                ", role='" + role + '\'' +
                ", username='" + username + '\'' +
                ", token='" + token + '\'' +
                ", userId=" + userId +
                '}';
    }
}

