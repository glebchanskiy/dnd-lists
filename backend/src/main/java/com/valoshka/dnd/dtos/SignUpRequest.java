package com.valoshka.dnd.dtos;

import com.valoshka.dnd.models.enums.RoleType;
import lombok.Data;

@Data
public class SignUpRequest {
    private String email;
    private String password;
    private RoleType role;
    private String iconStr;
}
