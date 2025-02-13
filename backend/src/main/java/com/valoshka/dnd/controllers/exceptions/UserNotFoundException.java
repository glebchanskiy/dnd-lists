package com.valoshka.dnd.controllers.exceptions;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class UserNotFoundException extends ResponseStatusException {

    public UserNotFoundException(HttpStatusCode status) {
        super(status);
    }

    public UserNotFoundException(HttpStatusCode status, String reason) {
        super(status, reason);
    }
}
