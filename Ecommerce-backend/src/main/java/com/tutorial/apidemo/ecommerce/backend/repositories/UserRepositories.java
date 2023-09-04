package com.tutorial.apidemo.ecommerce.backend.repositories;

import com.tutorial.apidemo.ecommerce.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface UserRepositories extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByPhone(String phone);
    User findByUsername(String username);

    User findByToken(String token);
    List<User> findAll();
}





