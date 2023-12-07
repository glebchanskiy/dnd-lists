package com.valoshka.dnd.repositories;

import com.valoshka.dnd.models.DndCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DndCharacterRepository extends JpaRepository<DndCharacter, Long> {
}
