package com.tutorial.apidemo.ecommerce.backend.repositories;

import com.tutorial.apidemo.ecommerce.backend.entity.Order;
import com.tutorial.apidemo.ecommerce.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepositories extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
