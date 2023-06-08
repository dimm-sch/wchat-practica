package com.practica.wchat.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public class LoginRequest {

    private final String username;
    @JsonAlias("secret")
    private final String password;

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
