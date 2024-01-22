package com.valoshka.dnd.controllers;

import com.valoshka.dnd.dtos.AuthRequest;
import com.valoshka.dnd.dtos.SignUpRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.valoshka.dnd.services.AuthService;

@RestController
@Slf4j
@RequestMapping(path = "/api/v1")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = RequestMethod.POST)
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> createNewUser(@RequestBody SignUpRequest signUpRequest) {
        return authService.createNewUser(signUpRequest);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest) {
        return authService.createAuthToken(authRequest);
    }


}
