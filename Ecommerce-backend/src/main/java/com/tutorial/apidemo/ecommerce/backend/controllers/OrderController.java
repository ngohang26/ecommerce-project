package com.tutorial.apidemo.ecommerce.backend.controllers;

import com.tutorial.apidemo.ecommerce.backend.entity.Order;
import com.tutorial.apidemo.ecommerce.backend.entity.User;
import com.tutorial.apidemo.ecommerce.backend.repositories.OrderRepositories;
import com.tutorial.apidemo.ecommerce.backend.repositories.UserRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping(path = "/users")

public class OrderController {
    @Autowired
    private OrderRepositories orderRepositories;

    @Autowired
    private UserRepositories userRepositories;

    @PostMapping("/purchase")
    public ResponseEntity<?> createOrder(@RequestBody Order newOrder) {
        if (newOrder.getUserId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID must not be null");
        }
    
        // Find the user
        User user = userRepositories.findById(newOrder.getUserId()).orElse(null);
        // Set the user on the order
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        newOrder.setUser(user);
        Order saveOrder = orderRepositories.save(newOrder);
        // Save the order to the database
        return ResponseEntity.status(HttpStatus.CREATED).body(saveOrder);
    }

    @GetMapping("/{userId}/orders")
    public  ResponseEntity<List<Order>> getOrders(@PathVariable Long userId) {
        Optional<User> user = userRepositories.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Order> orders = orderRepositories.findByUser(user.get());
        return ResponseEntity.ok(orders);
    }
}


