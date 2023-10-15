package com.tutorial.apidemo.ecommerce.backend.controllers;

import com.tutorial.apidemo.ecommerce.backend.dto.LoginDto;
import com.tutorial.apidemo.ecommerce.backend.dto.UserDto;
import com.tutorial.apidemo.ecommerce.backend.entity.User;
import com.tutorial.apidemo.ecommerce.backend.repositories.UserRepositories;
import com.tutorial.apidemo.ecommerce.backend.response.LoginResponse;
import com.tutorial.apidemo.ecommerce.backend.response.ProductResponse;
import com.tutorial.apidemo.ecommerce.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping(path = "user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepositories userRepositories;

    @GetMapping (path = "getAllUsers")
    public List<User> getAllUsers() {
        return userRepositories.findAll();
    }

    @PostMapping(path = "/register")
    public String saveUser(@RequestBody UserDto userDto) {
        String id = userService.addUser((userDto));
        return id;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        LoginResponse loginResponse = userService.loginUser(loginDto);
        if (loginResponse != null) {
            User user = userService.getUserByToken(loginResponse.getToken());
            if (user != null) {
                loginResponse.setUserId(user.getId());
            }
        }
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping(path = "/auto-login")
    public ResponseEntity<?> autoLoginUser(@RequestBody Map<String, Object> payload) {
        String token = (String) payload.get("token");
        User user = userService.getUserByToken(token);
        if (user != null) {
            // Nếu token hợp lệ, trả về thông tin người dùng
            String role = user.getRole().getName();
            String username = user.getUsername();
            return ResponseEntity.ok(new LoginResponse("Auto login success", true, role, username, token));
        } else {
            // Nếu token không hợp lệ, trả về thông báo lỗi
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse() {
                @Override
                public HttpStatusCode getStatusCode() {
                    return null;
                }

                @Override
                public ProblemDetail getBody() {
                    return null;
                }
            });
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ProductResponse> deleteUser(@PathVariable Long id) {
        boolean exists = userRepositories.existsById(id);
        if (exists) {
            userRepositories.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ProductResponse("ok", "Delete user succesfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ProductResponse("failed", "Cannot find user to delete", "")
        );
    }

    @GetMapping(path = "/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam String token) {
        User user = userService.getUserByToken(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(user);
    }

}






