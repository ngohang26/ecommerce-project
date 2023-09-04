package com.tutorial.apidemo.ecommerce.backend.service;


import com.tutorial.apidemo.ecommerce.backend.dto.LoginDto;
import com.tutorial.apidemo.ecommerce.backend.dto.UserDto;
import com.tutorial.apidemo.ecommerce.backend.entity.User;
import com.tutorial.apidemo.ecommerce.backend.response.LoginResponse;

public interface UserService {

    String addUser(UserDto userDto);

    void saveToken(String username, String token);

    LoginResponse loginUser(LoginDto loginDto);

    User getUserByToken(String token);

}


