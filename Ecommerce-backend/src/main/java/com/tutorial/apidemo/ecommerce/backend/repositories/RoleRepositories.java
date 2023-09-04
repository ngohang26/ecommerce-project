package com.tutorial.apidemo.ecommerce.backend.repositories;


import com.tutorial.apidemo.ecommerce.backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface RoleRepositories extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
