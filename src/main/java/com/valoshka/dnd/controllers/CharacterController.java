package com.valoshka.dnd.controllers;

import com.valoshka.dnd.models.DndCharacter;
import com.valoshka.dnd.repositories.DndCharacterRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@RequestMapping("api/v1/characters")
@AllArgsConstructor
public class CharacterController {

    private final DndCharacterRepository dndCharacterRepository;

    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            return ResponseEntity.ok(dndCharacterRepository.findAll());
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<?> saveCharacter(@RequestBody DndCharacter dndCharacter) {
        try {
            return ResponseEntity.ok(dndCharacterRepository.save(dndCharacter));
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCharacter(@PathVariable long id) {
        try {
            dndCharacterRepository.deleteById(id);
            return ResponseEntity.ok("Successfully deleted by " + id);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateCharacter(@PathVariable long id, @RequestBody DndCharacter updatedDndCharacter) {
        try {
            DndCharacter character = dndCharacterRepository.findById(id).orElseThrow();
            updatedDndCharacter.setId(id);
            return ResponseEntity.ok(dndCharacterRepository.save(updatedDndCharacter));
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }




}
