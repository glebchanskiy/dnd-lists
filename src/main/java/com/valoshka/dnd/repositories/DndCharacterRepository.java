package com.valoshka.dnd.repositories;

import com.valoshka.dnd.models.DndCharacter;
import com.valoshka.dnd.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DndCharacterRepository extends JpaRepository<DndCharacter, Long> {
    List<DndCharacter> findAllByPlayerNameId(User playerName);
}
