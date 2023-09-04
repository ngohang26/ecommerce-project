package com.tutorial.apidemo.ecommerce.backend.service.impl;

import com.tutorial.apidemo.ecommerce.backend.dto.LoginDto;
import com.tutorial.apidemo.ecommerce.backend.dto.UserDto;
import com.tutorial.apidemo.ecommerce.backend.entity.Address;
import com.tutorial.apidemo.ecommerce.backend.entity.Role;
import com.tutorial.apidemo.ecommerce.backend.entity.User;
import com.tutorial.apidemo.ecommerce.backend.repositories.RoleRepositories;
import com.tutorial.apidemo.ecommerce.backend.repositories.UserRepositories;
import com.tutorial.apidemo.ecommerce.backend.response.LoginResponse;
import com.tutorial.apidemo.ecommerce.backend.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepositories userRepositories;
    @Autowired
    private RoleRepositories roleRepositories;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public String addUser(UserDto userDto) {
        Role role;
        List<Address> addresses = new ArrayList<>();
        Optional<Role> optionalRole;
        if (userDto.getEmail().endsWith("@tlu.com")) {
            optionalRole = roleRepositories.findByName("ADMIN");
        } else {
            optionalRole = roleRepositories.findByName("USER");
        }
        if (optionalRole.isPresent()) {
            role = optionalRole.get();
        } else {
            if (userDto.getEmail().endsWith("@tlu.com")) {
                role = new Role("ADMIN");
            } else {
                role = new Role("USER");
            }
            roleRepositories.save(role);
        }
        User user = new User(
                userDto.getFirstname(),
                userDto.getLastname(),
                userDto.getPhone(),
                userDto.getEmail(),
                userDto.getUsername(),
                this.passwordEncoder.encode(userDto.getPassword()),
                userDto.getToken(),
                role,
                addresses

        );
        user.setRole(role);
        user.setAddresses(addresses);
        userRepositories.save(user);
        return user.getUsername();
    }

    @Override
    public void saveToken(String username, String token) {
        User user = userRepositories.findByUsername(username);
        if (user != null) {
            user.setToken(token);
            userRepositories.save(user);
        }
    }

    @Override
    public User getUserByToken(String token) {
        return userRepositories.findByToken(token);
    }

    @Override
    public LoginResponse loginUser(LoginDto loginDto) {
        String identifier = loginDto.getIdentifier();
        String password = loginDto.getPassword();
        User user1 = null;
        if (identifier.contains("@")) {
            user1 = userRepositories.findByEmail(identifier);


        } else if (identifier.matches("\\d+")) {
            user1 = userRepositories.findByPhone(identifier);
        } else {
            user1 = userRepositories.findByUsername(identifier);
        }
        if (user1 == null) {
            throw new RuntimeException("Invalid email, phone or username");
        }
        if (!passwordEncoder.matches(password, user1.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Tạo token cho người dùng
        Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        String token = Jwts.builder()
                .setSubject(user1.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + 86400 * 1000))
                .signWith(secretKey)
                .compact();

        // Lưu trữ token vào cơ sở dữ liệu
        user1.setToken(token);
        userRepositories.save(user1);

        String role = user1.getRole().getName();
        String username = user1.getUsername();
        return new LoginResponse("Login Success", true, role, username, token);
    }


}

