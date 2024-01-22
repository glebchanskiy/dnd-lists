package com.valoshka.dnd.controllers.exceptions;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class DndCharacterNotFoundException extends ResponseStatusException {

    public DndCharacterNotFoundException(HttpStatusCode status) {
        super(status);
    }

    public DndCharacterNotFoundException(HttpStatusCode status, String reason) {
        super(status, reason);
    }
}
