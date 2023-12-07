package com.valoshka.dnd.repositories;

import com.valoshka.dnd.models.Clazz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClazzRepository extends JpaRepository<Clazz, String> {
}
