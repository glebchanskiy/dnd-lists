package com.valoshka.dnd.repositories;

import com.valoshka.dnd.models.Faction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FactionRepository extends JpaRepository<Faction, String> {
}
