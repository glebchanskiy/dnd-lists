package com.valoshka.dnd.controllers.exceptions;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class PermissionDeniedException extends ResponseStatusException {

    public PermissionDeniedException(HttpStatusCode status) {
        super(status);
    }

    public PermissionDeniedException(HttpStatusCode status, String reason) {
        super(status, reason);
    }
}
