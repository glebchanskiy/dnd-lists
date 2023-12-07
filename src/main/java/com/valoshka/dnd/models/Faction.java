package com.valoshka.dnd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Table(name = "factions")
@NoArgsConstructor
@RequiredArgsConstructor
public class Faction {

    @Id
    @Column(name = "name")
    @NonNull
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH},
            mappedBy = "faction", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<DndCharacter> dndCharacter;

    public @NonNull String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public List<DndCharacter> getDndCharacter() {
        return this.dndCharacter;
    }

    public void setName(@NonNull String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDndCharacter(List<DndCharacter> dndCharacter) {
        this.dndCharacter = dndCharacter;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof Faction)) return false;
        final Faction other = (Faction) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$name = this.getName();
        final Object other$name = other.getName();
        if (this$name == null ? other$name != null : !this$name.equals(other$name)) return false;
        final Object this$description = this.getDescription();
        final Object other$description = other.getDescription();
        if (this$description == null ? other$description != null : !this$description.equals(other$description))
            return false;
        final Object this$dndCharacter = this.getDndCharacter();
        final Object other$dndCharacter = other.getDndCharacter();
        if (this$dndCharacter == null ? other$dndCharacter != null : !this$dndCharacter.equals(other$dndCharacter))
            return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Faction;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $name = this.getName();
        result = result * PRIME + ($name == null ? 43 : $name.hashCode());
        final Object $description = this.getDescription();
        result = result * PRIME + ($description == null ? 43 : $description.hashCode());
        final Object $dndCharacter = this.getDndCharacter();
        result = result * PRIME + ($dndCharacter == null ? 43 : $dndCharacter.hashCode());
        return result;
    }

    public String toString() {
        return "Faction(name=" + this.getName() + ", description=" + this.getDescription() + ")";
    }
}
