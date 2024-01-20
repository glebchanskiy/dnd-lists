package com.valoshka.dnd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.valoshka.dnd.models.enums.AlignmentType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Table(name = "dnd_characters")
@Data
@NoArgsConstructor
public class DndCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "classlevel")
    private String classLevel;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "classnameid")
    private Clazz dndClass;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "backgroundid")
    private Background background;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "playernameid")
    private User playerNameId;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "factionid")
    private Faction faction;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "raceid")
    private Race race;

    @Column(name = "playername")
    private String playerName;

    @Enumerated(EnumType.STRING)
    @Column(name = "alignment")
    private AlignmentType alignment;

    @Column(name = "xp")
    private String xp;

    @Column(name = "dcino")
    private String dciNo;

    @Column(name = "str")
    private String str;

    @Column(name = "dex")
    private String dex;

    @Column(name = "con")
    private String con;

    @Column(name = "int")
    private String ind;

    @Column(name = "wis")
    private String wis;

    @Column(name = "cha")
    private String cha;

    @Column(name = "inspiration")
    private String inspiration;

    @Column(name = "proficiencybonus")
    private String proficiencyBonus;

    @Column(name = "strsave")
    private String strSave;

    @Column(name = "intsave")
    private String intSave;

    @Column(name = "intsavechecked")
    private Boolean intSaveChecked;

    @Column(name = "wissave")
    private String wisSave;

    @Column(name = "wissavechecked")
    private Boolean wisSaveChecked;

    @Column(name = "chasave")
    private String chaSave;

    @Column(name = "chasavechecked")
    private Boolean chaSaveChecked;

    @Column(name = "skillacrobatics")
    private String skillAcrobatics;

    @Column(name = "skillacrobaticschecked")
    private Boolean skillAcrobaticsChecked;

    @Column(name = "skillanimalhandling")
    private String skillAnimalHandling;

    @Column(name = "skillanimalhandlingchecked")
    private Boolean skillAnimalHandlingChecked;

    @Column(name = "skillarcana")
    private String skillArcana;

    @Column(name = "skillarcanachecked")
    private Boolean skillArcanaChecked;

    @Column(name = "skillathletics")
    private String skillAthletics;

    @Column(name = "skillathleticschecked")
    private Boolean skillAthleticsChecked;

    @Column(name = "skilldeception")
    private String skillDeception;

    @Column(name = "skilldeceptionchecked")
    private Boolean skillDeceptionChecked;

    @Column(name = "skillhistory")
    private String skillHistory;

    @Column(name = "skillhistorychecked")
    private Boolean skillHistoryChecked;

    @Column(name = "skillinsight")
    private String skillInsight;

    @Column(name = "skillinsightchecked")
    private Boolean skillInsightChecked;

    @Column(name = "skillintimidation")
    private String skillIntimidation;

    @Column(name = "skillintimidationchecked")
    private Boolean skillIntimidationChecked;

    @Column(name = "skillinvestigation")
    private String skillInvestigation;

    @Column(name = "skillinvestigationchecked")
    private Boolean skillInvestigationChecked;

    @Column(name = "skillmedicine")
    private String skillMedicine;

    @Column(name = "skillmedicinechecked")
    private Boolean skillMedicineChecked;

    @Column(name = "skillnature")
    private String skillNature;

    @Column(name = "skillnaturechecked")
    private Boolean skillNatureChecked;

    @Column(name = "skillperception")
    private String skillPerception;

    @Column(name = "skillperceptionchecked")
    private Boolean skillPerceptionChecked;

    @Column(name = "skillperformance")
    private String skillPerformance;

    @Column(name = "skillperformancechecked")
    private Boolean skillPerformanceChecked;

    @Column(name = "skillpersuasion")
    private String skillPersuasion;

    @Column(name = "skillpersuasionchecked")
    private Boolean skillPersuasionChecked;

    @Column(name = "skillreligion")
    private String skillReligion;

    @Column(name = "skillreligionchecked")
    private Boolean skillReligionChecked;

    @Column(name = "skillslightofhand")
    private String skillSlightOfHand;

    @Column(name = "skillslightofhandchecked")
    private Boolean skillSlightOfHandChecked;

    @Column(name = "skillstealth")
    private String skillStealth;

    @Column(name = "skillstealthchecked")
    private Boolean skillStealthChecked;

    @Column(name = "skillsurvival")
    private String skillSurvival;

    @Column(name = "skillsurvivalchecked")
    private Boolean skillSurvivalChecked;

    @Column(name = "passiveperception")
    private String passivePerception;

    @Column(name = "otherproficiencies")
    private String otherProficiencies;

    @Column(name = "ac")
    private String ac;

    @Column(name = "init")
    private String init;

    @Column(name = "speed")
    private String speed;

    @Column(name = "maxhp")
    private String maxHp;

    @Column(name = "hp")
    private String hp;

    @Column(name = "temphp")
    private String tempHp;

    @Column(name = "hitdicemax")
    private String hitDiceMax;

    @Column(name = "hitdice")
    private String hitDice;

    @Column(name = "deathsavesuccesses")
    private Integer deathsaveSuccesses;

    @Column(name = "deathsavefailures")
    private Integer deathsaveFailures;

    @Column(name = "attacks")
    private String attacks; ///////////////

    @Column(name = "attackstext")
    private String attacksText;

    @Column(name = "cp")
    private String cp;

    @Column(name = "sp")
    private String sp;

    @Column(name = "ep")
    private String ep;

    @Column(name = "gp")
    private String gp;

    @Column(name = "pp")
    private String pp;

    @Column(name = "equipment")
    private String equipment;

    @Column(name = "equipment2")
    private String equipment2;

    @Column(name = "personalitytraits")
    private String personalityTraits;

    @Column(name = "ideals")
    private String ideals;

    @Column(name = "bonds")
    private String bonds;

    @Column(name = "flaws")
    private String flaws;

    @Column(name = "featurestraits")
    private String featuresTraits;

    @Column(name = "age")
    private String age;

    @Column(name = "height")
    private String height;

    @Column(name = "weight")
    private String weight;

    @Column(name = "eyes")
    private String eyes;

    @Column(name = "skin")
    private String skin;

    @Column(name = "hair")
    private String hair;

    @Column(name = "appearance")
    private String appearance;

    @Column(name = "backstory")
    private String backstory;

    @Column(name = "factionimg")
    private String factionImg;

    @Column(name = "factionrank")
    private String factionRank;

    @Column(name = "allies")
    private String allies;

    @Column(name = "allies2")
    private String allies2;

    @Column(name = "additionalfeatures")
    private String additionalFeatures;

    @Column(name = "additionalfeatures2")
    private String additionalFeatures2;

    @Column(name = "totalnonconsumablemagicitems")
    private String totalNonConsumableMagicItems;

    @Column(name = "treasure")
    private String treasure;

    @Column(name = "treasure2")
    private String treasure2;

    @Column(name = "spellcastingclass")
    private String spellcastingClass;

    @Column(name = "preparedspellstotal")
    private String preparedSpellsTotal;

    @Column(name = "spellsavedc")
    private String spellSaveDC;

    @Column(name = "spellattackbonus")
    private String spellAttackBonus;

    @Column(name = "lvl2spellslotstotal")
    private String lvl2SpellSlotsTotal;

    @Column(name = "lvl2spellslotsused")
    private Integer lvl2SpellSlotsUsed;

    @Column(name = "lvl2spells")
    private String lvl2Spells; ///////////////

    @Column(name = "lvl3spellslotstotal")
    private String lvl3SpellSlotsTotal;

    @Column(name = "lvl3spellslotsused")
    private Integer lvl3SpellSlotsUsed;

    @Column(name = "lvl3spells")
    private String lvl3Spells;   ///////////////

    @Column(name = "lvl4spellslotstotal")
    private String lvl4SpellSlotsTotal;

    @Column(name = "lvl4spellslotsused")
    private Integer lvl4SpellSlotsUsed;

    @Column(name = "lvl4spells")
    private String lvl4Spells;  ///////////////

    @Column(name = "lvl5spellslotstotal")
    private String lvl5SpellSlotsTotal;

    @Column(name = "lvl5spellslotsused")
    private Integer lvl5SpellSlotsUsed;

    @Column(name = "lvl5spells")
    private String lvl5Spells; ///////////////

    @Column(name = "lvl6spellslotstotal")
    private String lvl6SpellSlotsTotal;

    @Column(name = "lvl6spellslotsused")
    private Integer lvl6SpellSlotsUsed;

    @Column(name = "lvl6spells")
    private String lvl6Spells;  ///////////////

    @Column(name = "lvl7spellslotstotal")
    private String lvl7SpellSlotsTotal;

    @Column(name = "lvl7spellslotsused")
    private Integer lvl7SpellSlotsUsed;

    @Column(name = "lvl7spells")
    private String lvl7Spells;  ///////////////

    @Column(name = "lvl8spellslotstotal")
    private String lvl8SpellSlotsTotal;

    @Column(name = "lvl8spellslotsused")
    private Integer lvl8SpellSlotsUsed;

    @Column(name = "lvl8spells")
    private String lvl8Spells;   ///////////////

    @Column(name = "lvl9spellslotstotal")
    private String lvl9SpellSlotsTotal;

    @Column(name = "lvl9spellslotsused")
    private Integer lvl9SpellSlotsUsed;

    @Column(name = "lvl9spells")
    private String lvl9Spells;  ///////////////

}

