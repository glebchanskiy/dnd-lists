package com.valoshka.dnd.services;

import com.valoshka.dnd.dtos.SignUpRequest;
import com.valoshka.dnd.token.JwtTokenProvider;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import com.valoshka.dnd.dtos.AuthRequest;
import com.valoshka.dnd.models.User;
import com.valoshka.dnd.dtos.JwtResponse;
import com.valoshka.dnd.services.exceptions.UserAuthenticationException;
@Service
@Slf4j
@AllArgsConstructor
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> createNewUser(@RequestBody SignUpRequest signUpRequest) {
       return userService.createUser(signUpRequest);
    }

    public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest) {
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(), authRequest.getPassword()
                    ));
            // желательно обработать!
            User user = userService.findByEmail(authRequest.getEmail()).orElseThrow();
            String token = jwtTokenProvider.generateToken(user);
            return ResponseEntity.ok(new JwtResponse(token));

        } catch (BadCredentialsException ex) {
            log.info(ex.getMessage());
            throw new UserAuthenticationException("Wrong username or password");
        }

    }
}
