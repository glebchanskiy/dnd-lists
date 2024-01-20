package com.valoshka.dnd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.valoshka.dnd.models.enums.RoleType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;


@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class User {

    @Id
    @Column(name = "email")
    @NonNull
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private RoleType role;

    @Column(name = "icon_str")
    private String iconStr;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH},
            mappedBy = "playerNameId", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<DndCharacter> dndCharacterList;

    public String toString() {
        return "User(email=" + this.getEmail() + ", password=" + this.getPassword() + ", role=" + this.getRole() + ", iconStr=" + this.getIconStr() + ")";
    }


}