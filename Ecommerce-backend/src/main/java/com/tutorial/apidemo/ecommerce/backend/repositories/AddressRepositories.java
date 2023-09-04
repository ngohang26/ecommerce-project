package com.tutorial.apidemo.ecommerce.backend.repositories;

import com.tutorial.apidemo.ecommerce.backend.entity.Address;
import com.tutorial.apidemo.ecommerce.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepositories extends JpaRepository<Address, Long>{
    List<Address> findByUser(User user);
}
