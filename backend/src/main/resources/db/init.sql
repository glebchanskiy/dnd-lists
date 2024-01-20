CREATE TYPE alignment_type AS ENUM ('CHAOTIC_GOOD', 'LAWFUL_EVIL', 'NEUTRAL', 'CHAOTIC_EVIL', 'LAWFUL_NEUTRAL', 'NEUTRAL_EVIL', 'TRUE_NEUTRAL', 'EVIL', 'GOOD', 'UNALIGNED');
CREATE CAST (VARCHAR AS alignment_type) WITH INOUT AS IMPLICIT;

CREATE TYPE role_type AS ENUM ('ROLE_USER', 'ROLE_ADMIN');
CREATE CAST (VARCHAR AS role_type) WITH INOUT AS IMPLICIT;


CREATE TABLE users
(
    email    VARCHAR NOT NULL UNIQUE PRIMARY KEY,
    password VARCHAR,
    role     role_type,
    icon_str TEXT
);

CREATE TABLE backgrounds
(
    name        VARCHAR NOT NULL UNIQUE PRIMARY KEY,
    description VARCHAR
);

CREATE TABLE factions
(
    name        VARCHAR NOT NULL UNIQUE PRIMARY KEY,
    description VARCHAR
);

CREATE TABLE races
(
    name        VARCHAR NOT NULL UNIQUE PRIMARY KEY,
    description VARCHAR
);

CREATE TABLE classes
(
    name        VARCHAR NOT NULL UNIQUE PRIMARY KEY,
    description VARCHAR
);


CREATE TABLE dnd_characters
(
    id                           SERIAL PRIMARY KEY,
    name                         VARCHAR,
    classLevel                   VARCHAR,
    classNameId                  VARCHAR REFERENCES classes (name),
    backgroundId                 VARCHAR REFERENCES backgrounds (name),
    playerNameId                 VARCHAR REFERENCES users (email),
    factionId                    VARCHAR REFERENCES factions (name),
    raceId                       VARCHAR REFERENCES races (name),
    playerName                   VARCHAR,
    alignment                    alignment_type,
    xp                           VARCHAR,
    dciNo                        VARCHAR,

    str                          VARCHAR,
    dex                          VARCHAR,
    con                          VARCHAR,
    int                          VARCHAR,
    wis                          VARCHAR,
    cha                          VARCHAR,

    inspiration                  VARCHAR,
    proficiencyBonus             VARCHAR,
    strSave                      VARCHAR,
    strSaveChecked               BOOLEAN,
    dexSave                      VARCHAR,
    dexSaveChecked               BOOLEAN,
    conSave                      VARCHAR,
    conSaveChecked               BOOLEAN,
    intSave                      VARCHAR,
    intSaveChecked               BOOLEAN,
    wisSave                      VARCHAR,
    wisSaveChecked               BOOLEAN,
    chaSave                      VARCHAR,
    chaSaveChecked               BOOLEAN,
    skillAcrobatics              VARCHAR,
    skillAcrobaticsChecked       BOOLEAN,
    skillAnimalHandling          VARCHAR,
    skillAnimalHandlingChecked   BOOLEAN,
    skillArcana                  VARCHAR,
    skillArcanaChecked           BOOLEAN,
    skillAthletics               VARCHAR,
    skillAthleticsChecked        BOOLEAN,
    skillDeception               VARCHAR,
    skillDeceptionChecked        BOOLEAN,
    skillHistory                 VARCHAR,
    skillHistoryChecked          BOOLEAN,
    skillInsight                 VARCHAR,
    skillInsightChecked          BOOLEAN,
    skillIntimidation            VARCHAR,
    skillIntimidationChecked     BOOLEAN,
    skillInvestigation           VARCHAR,
    skillInvestigationChecked    BOOLEAN,
    skillMedicine                VARCHAR,
    skillMedicineChecked         BOOLEAN,
    skillNature                  VARCHAR,
    skillNatureChecked           BOOLEAN,
    skillPerception              VARCHAR,
    skillPerceptionChecked       BOOLEAN,
    skillPerformance             VARCHAR,
    skillPerformanceChecked      BOOLEAN,
    skillPersuasion              VARCHAR,
    skillPersuasionChecked       BOOLEAN,
    skillReligion                VARCHAR,
    skillReligionChecked         BOOLEAN,
    skillSlightOfHand            VARCHAR,
    skillSlightOfHandChecked     BOOLEAN,
    skillStealth                 VARCHAR,
    skillStealthChecked          BOOLEAN,
    skillSurvival                VARCHAR,
    skillSurvivalChecked         BOOLEAN,
    passivePerception            VARCHAR,
    otherProficiencies           VARCHAR,
    ac                           VARCHAR,
    init                         VARCHAR,
    speed                        VARCHAR,
    maxHp                        VARCHAR,
    hp                           VARCHAR,
    tempHp                       VARCHAR,
    hitDiceMax                   VARCHAR,
    hitDice                      VARCHAR,
    deathsaveSuccesses           INT,
    deathsaveFailures            INT,

    attacks                      VARCHAR,
    attacksText                  VARCHAR,

    cp                           VARCHAR,
    sp                           VARCHAR,
    ep                           VARCHAR,
    gp                           VARCHAR,
    pp                           VARCHAR,
    equipment                    VARCHAR,
    equipment2                   VARCHAR,

    personalityTraits            VARCHAR,
    ideals                       VARCHAR,
    bonds                        VARCHAR,
    flaws                        VARCHAR,

    featuresTraits               VARCHAR,

    age                          VARCHAR,
    height                       VARCHAR,
    weight                       VARCHAR,
    eyes                         VARCHAR,
    skin                         VARCHAR,
    hair                         VARCHAR,

    appearance                   VARCHAR,
    backstory                    VARCHAR,

    factionImg                   VARCHAR,
    factionRank                  VARCHAR,
    allies                       VARCHAR,
    allies2                      VARCHAR,

    additionalFeatures           VARCHAR,
    additionalFeatures2          VARCHAR,

    totalNonConsumableMagicItems VARCHAR,
    treasure                     VARCHAR,
    treasure2                    VARCHAR,

    spellcastingClass            VARCHAR,
    preparedSpellsTotal          VARCHAR,
    spellSaveDC                  VARCHAR,
    spellAttackBonus             VARCHAR,

    lvl1SpellSlotsTotal          VARCHAR,
    lvl1SpellSlotsUsed           INT,
    lvl1Spells                   VARCHAR,

    lvl2SpellSlotsTotal          VARCHAR,
    lvl2SpellSlotsUsed           INT,
    lvl2Spells                   VARCHAR,

    lvl3SpellSlotsTotal          VARCHAR,
    lvl3SpellSlotsUsed           INT,
    lvl3Spells                   VARCHAR,

    lvl4SpellSlotsTotal          VARCHAR,
    lvl4SpellSlotsUsed           INT,
    lvl4Spells                   VARCHAR,

    lvl5SpellSlotsTotal          VARCHAR,
    lvl5SpellSlotsUsed           INT,
    lvl5Spells                   VARCHAR,

    lvl6SpellSlotsTotal          VARCHAR,
    lvl6SpellSlotsUsed           INT,
    lvl6Spells                   VARCHAR,

    lvl7SpellSlotsTotal          VARCHAR,
    lvl7SpellSlotsUsed           INT,
    lvl7Spells                   VARCHAR,

    lvl8SpellSlotsTotal          VARCHAR,
    lvl8SpellSlotsUsed           INT,
    lvl8Spells                   VARCHAR,

    lvl9SpellSlotsTotal          VARCHAR,
    lvl9SpellSlotsUsed           INT,
    lvl9Spells                   VARCHAR

);