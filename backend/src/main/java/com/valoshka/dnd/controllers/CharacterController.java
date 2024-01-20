package com.valoshka.dnd.controllers;

import com.valoshka.dnd.models.DndCharacter;
import com.valoshka.dnd.repositories.DndCharacterRepository;
import com.valoshka.dnd.repositories.UserRepository;
import com.valoshka.dnd.token.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@RequestMapping("api/v1/characters")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.HEAD})
public class CharacterController {

    private final DndCharacterRepository dndCharacterRepository;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping
    public ResponseEntity<?> findAll(HttpServletRequest request) {
        try {
            String jwtToken = request.getHeader("Authorization");
            if (jwtToken.length() > 8) {
                var username = jwtTokenProvider.getEmail(jwtToken.substring(7));
                var user = userRepository.findByEmail(username).orElseThrow();
                return ResponseEntity.ok(dndCharacterRepository.findAllByPlayerNameId(user));
            } else {
                throw new RuntimeException();
            }
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping
    public ResponseEntity<?> saveCharacter(@RequestBody DndCharacter dndCharacter, HttpServletRequest request) {
        try {

            String jwtToken = request.getHeader("Authorization");
            if (jwtToken.length() > 8) {
                var username = jwtTokenProvider.getEmail(jwtToken.substring(7));
                var user = userRepository.findByEmail(username).orElseThrow();
                dndCharacter.setPlayerNameId(user);
                return ResponseEntity.ok(dndCharacterRepository.save(dndCharacter));
            } else {
                throw new RuntimeException();
            }

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCharacter(@PathVariable long id, HttpServletRequest request) {
        try {

            String jwtToken = request.getHeader("Authorization");
            if (jwtToken.length() > 8) {
                // TODO delete only self chars
                var username = jwtTokenProvider.getEmail(jwtToken.substring(7));
                var user = userRepository.findByEmail(username).orElseThrow();
                dndCharacterRepository.deleteById(id);
                return ResponseEntity.ok("Successfully deleted by " + id);
            } else {
                throw new RuntimeException();
            }
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateCharacter(@PathVariable long id, @RequestBody DndCharacter updatedDndCharacter, HttpServletRequest request) {
        try {
            String jwtToken = request.getHeader("Authorization");
            System.out.println("token" + jwtToken);
            if (jwtToken != null) {
                // TODO delete only self chars
                var token = jwtToken.substring(7);
                var username = jwtTokenProvider.getEmail(token);
                System.out.println("username: " + username);
                var user = userRepository.findByEmail(username).orElseThrow();
                System.out.println("user: " + user.getEmail());
                DndCharacter character = dndCharacterRepository.findById(id).orElseThrow();
                System.out.println("character: " + character.getName());
                updatedDndCharacter.setId(id);
                updatedDndCharacter.setPlayerNameId(user);

                if (user.getEmail().equals(updatedDndCharacter.getPlayerNameId().getEmail())) {
                    System.out.println("KEKEKE");
                    return ResponseEntity.ok(dndCharacterRepository.save(updatedDndCharacter));
                }

                else
                    throw new RuntimeException();
            } else {
                throw new RuntimeException();
            }

        } catch (Exception ex) {
            throw ex;
//            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }




}
