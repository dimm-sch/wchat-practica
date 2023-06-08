package com.practica.wchat.service;

import com.practica.wchat.entity.User;
import com.practica.wchat.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;

    public AuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void signUp(User user) {
        userRepository.save(user);
    }
}
