package com.valoshka.dnd.controllers;

import com.valoshka.dnd.controllers.exceptions.DndCharacterNotFoundException;
import com.valoshka.dnd.controllers.exceptions.PermissionDeniedException;
import com.valoshka.dnd.controllers.exceptions.UserNotFoundException;
import com.valoshka.dnd.models.DndCharacter;
import com.valoshka.dnd.models.User;
import com.valoshka.dnd.repositories.DndCharacterRepository;
import com.valoshka.dnd.repositories.UserRepository;
import com.valoshka.dnd.token.JwtTokenProvider;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("api/v1/characters")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.HEAD})
public class CharacterController {

    private final DndCharacterRepository dndCharacterRepository;
    private final UserRepository userRepository;

    @GetMapping
    public List<DndCharacter> findAll(Authentication auth) {
        final User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        log.info("auth: {}", auth);
        return dndCharacterRepository.findAllByPlayerNameId(user);
    }

    @PostMapping
    public DndCharacter saveCharacter(@RequestBody DndCharacter dndCharacter, Authentication auth) {
        final User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        dndCharacter.setPlayerNameId(user);
        return dndCharacterRepository.save(dndCharacter);
    }

    @DeleteMapping("/{id}")
    public String deleteCharacter(@PathVariable long id, Authentication auth) {
        userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UserNotFoundException(HttpStatus.NOT_FOUND, "User [" + auth.getName() +  "] Not Found"));
        dndCharacterRepository.deleteById(id);
        return "Successfully deleted by " + id;
    }

    @PostMapping("/{id}")
    public DndCharacter updateCharacter(@PathVariable long id, @RequestBody DndCharacter updatedDndCharacter, Authentication auth) {
        var user = userRepository.findByEmail(auth.getName()).orElseThrow();
        dndCharacterRepository.findById(id).orElseThrow(() -> new DndCharacterNotFoundException(HttpStatus.NOT_FOUND, "Character Not Found"));
        updatedDndCharacter.setId(id);
        updatedDndCharacter.setPlayerNameId(user);

        if (!user.getEmail().equals(updatedDndCharacter.getPlayerNameId().getEmail())) {
            throw new PermissionDeniedException(HttpStatus.FORBIDDEN, "No rights to change the resource");
        }

        return dndCharacterRepository.save(updatedDndCharacter);
    }
}
