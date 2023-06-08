package com.practica.wchat;

import java.util.Map;

import com.practica.wchat.dto.LoginRequest;
import com.practica.wchat.entity.User;
import com.practica.wchat.service.AuthenticationService;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;

@RestController
public class UserController {

    private static String CHAT_ENGINE_PROJECT_ID = "9a0d8fae-d8e5-4e72-9da9-dd4608b00048";
    private static String CHAT_ENGINE_PRIVATE_KEY = "5c205c2c-0b76-4027-9404-8fa8e424bac3";

    private final RestTemplate restTemplate;
    private final AuthenticationService authenticationService;

    public UserController(RestTemplate restTemplate, AuthenticationService authenticationService) {
        this.restTemplate = restTemplate;
        this.authenticationService = authenticationService;
    }

    @CrossOrigin
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> logIn(@RequestBody LoginRequest loginRequest) {
        String url = "https://api.chatengine.io/users/me";
        RequestEntity<Void> request = RequestEntity.get(url)
                .accept(MediaType.APPLICATION_JSON)
                .header("Project-Id", CHAT_ENGINE_PROJECT_ID)
                .header("User-Name", loginRequest.getUsername())
                .header("User-Secret", loginRequest.getPassword())
                .build();

        try {
            return restTemplate.exchange(request, String.class);
        } catch (HttpClientErrorException e) {
            return new ResponseEntity<>(e.getResponseBodyAsString(), e.getResponseHeaders(), e.getStatusCode());
        }
    }

    @CrossOrigin
    @RequestMapping(path = "/signup", method = RequestMethod.POST)
    public ResponseEntity<?> signUp(@RequestBody User user, RequestEntity<?> entity, Map<String, Object> map,
                                    HttpServletRequest httpServletRequest) {
        String url = "https://api.chatengine.io/users";
        JSONObject requestBody = new JSONObject();
        requestBody.put("username", user.getUsername());
        requestBody.put("secret", user.getPassword());
        requestBody.put("email", user.getEmail());
        requestBody.put("first_name", user.getFirstName());
        requestBody.put("last_name", user.getLastName());
        RequestEntity<String> request = RequestEntity.post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .header("Private-Key", CHAT_ENGINE_PRIVATE_KEY)
                .body(requestBody.toString());

        try {
            ResponseEntity<String> exchangeResponse = restTemplate.exchange(request, String.class);
            authenticationService.signUp(user);
            return exchangeResponse;
        } catch (HttpClientErrorException e) {
            return new ResponseEntity<>(e.getResponseBodyAsString(), e.getResponseHeaders(), e.getStatusCode());
        }
    }
}
