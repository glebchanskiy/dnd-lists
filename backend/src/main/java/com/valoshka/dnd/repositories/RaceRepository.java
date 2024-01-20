package com.valoshka.dnd.repositories;

import com.valoshka.dnd.models.Race;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RaceRepository extends JpaRepository<Race, String> {
}
