package com.tutorial.apidemo.ecommerce.backend.controllers;

import com.tutorial.apidemo.ecommerce.backend.entity.Address;
import com.tutorial.apidemo.ecommerce.backend.entity.User;
import com.tutorial.apidemo.ecommerce.backend.repositories.AddressRepositories;
import com.tutorial.apidemo.ecommerce.backend.repositories.UserRepositories;
import com.tutorial.apidemo.ecommerce.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(path = "/users")
public class AddressController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepositories userRepositories;

    @Autowired
    private AddressRepositories addressRepositories;

    @PostMapping("/{userId}/addresses")
    public ResponseEntity<?> addAddress(@PathVariable Long userId, @RequestBody Address address) {
        Optional<User> user = userRepositories.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        address.setUser(user.get());
        addressRepositories.save(address);
        // tra ve ma thanh cong 201 Created
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(address.getId()).toUri();
        return ResponseEntity.created(location).build();
    }



    @GetMapping("/{userId}/addresses")
    public ResponseEntity<List<Address>> getAddresses(@PathVariable Long userId) {
        Optional<User> user = userRepositories.findById(userId);    
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Address> addresses = addressRepositories.findByUser(user.get());
        return ResponseEntity.ok(addresses);
    }

    @PutMapping("/{userId}/addresses/{addressId}")
    public ResponseEntity<?> updateAddress(@PathVariable Long userId, @PathVariable Long addressId, @RequestBody Address newAddress) {
        Optional<User> user = userRepositories.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Optional<Address> address = addressRepositories.findById(addressId);
        if (address.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        address.get().setName(newAddress.getName());
        address.get().setPhone(newAddress.getPhone());
        address.get().setCity(newAddress.getCity());
        address.get().setDistrict(newAddress.getDistrict());
        address.get().setWard(newAddress.getWard());
        address.get().setStreet(newAddress.getStreet());
        addressRepositories.save(address.get());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}/addresses/{addressId}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long userId, @PathVariable Long addressId) {
        Optional<User> user = userRepositories.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Optional<Address> address = addressRepositories.findById(addressId);
        if (address.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        addressRepositories.delete(address.get());
        return ResponseEntity.noContent().build();
    }
}
