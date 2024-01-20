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

INSERT INTO factions (name, description)
VALUES
    ('Harper', 'Фракция, занимающаяся сбором информации и поддержанием баланса сил в мире.'),
    ('Lord''s Alliance', 'Альянс правителей и правительств, стремящийся к сохранению стабильности и мира.'),
    ('Zhentarim', 'Тайное общество, ориентированное на власть и контроль.'),
    ('Emerald Enclave', 'Фракция, посвященная защите и сохранению природы.'),
    ('Order of the Gauntlet', 'Орден, сфокусированный на борьбе с злом и защите бесправных.'),
    ('The Kraken Society', 'Таинственная фракция, посвященная изучению и использованию силы моря.'),
    ('The Cult of the Dragon', 'Культ, поклоняющийся драконам и стремящийся к их власти.'),
    ('The Bregan D''Aerthe', 'Тайная организация наемников и шпионов, ориентированная на власть и деньги.');

INSERT INTO classes (name, description)
VALUES
    ('Бард', 'Вы музыкант, поэт или историк, использующий искусство для влияния на других.'),
    ('Варвар', 'Вы берсерк, человек действия, доверяющий своим инстинктам.'),
    ('Волшебник', 'Вы изучили магию и получили знания, необходимые для её применения.'),
    ('Воин', 'Вы обладаете боевыми навыками и военной тренировкой.'),
    ('Друид', 'Вы связаны с природой и владеете магией, основанной на ней.'),
    ('Жрец', 'Вы служитель божества, получающий свои способности из веры.'),
    ('Колдун', 'Вы заключили пакт с могущественным существом, обладающим магической силой.'),
    ('Монах', 'Вы обучены тайным искусствам, в том числе боевым и духовным.'),
    ('Паладин', 'Вы чемпион добра и справедливости, обладающий священной силой.'),
    ('Плут', 'Вы искусный обманщик и умелец в скрытности и уклонении.'),
    ('Рейнджер', 'Вы мастер выживания в дикой природе и искусный охотник.'),
    ('Чародей', 'Ваша магия проистекает от внутренних источников, вы не изучали её, артефакты или пакты.');

INSERT INTO backgrounds (name, description)
VALUES
    ('Артист', 'Вы художник, актер или музыкант, виртуозно владеющий своим ремеслом.'),
    ('Беспризорник', 'Вы выросли на улицах без прямого попечения взрослых.'),
    ('Благородный', 'Вы родились в благородной семье, имеющей связи и ресурсы.'),
    ('Гильдейский ремесленник', 'Вы присоединились к гильдии или ассоциации как мастер своего ремесла.'),
    ('Моряк', 'Вы провели большую часть своей жизни на кораблях.'),
    ('Мудрец', 'Ваша жажда знаний непревзойденна.'),
    ('Народный герой', 'Вы известны в небольшом сообществе как герой или защитник.'),
    ('Отшельник', 'Вы провели большую часть жизни в одиночестве или вдали от цивилизации.'),
    ('Пират', 'Вы были частью пиратской братии или работали на корабле сомнительной репутации.'),
    ('Преступник', 'Вы занимались преступной деятельностью и знаете, как избегать закона.'),
    ('Прислужник', 'Вы служили кому-то в качестве слуги или подчиненного.'),
    ('Солдат', 'Вы служили в вооруженных силах страны или организации.'),
    ('Чужеземец', 'Вы родились или провели долгое время в другой стране или культуре.'),
    ('Шарлатан', 'Вы искусный обманщик, знающий, как обмануть доверчивых людей.');

INSERT INTO races (name, description)
VALUES
    ('Человек', 'Универсальные и адаптивные существа, мастера многих профессий.'),
    ('Эльф', 'Грациозные и долгожители, обладают высокой ловкостью и владеют магией.'),
    ('Дварф', 'Крепкие и выносливые, с отличным чувством ремесла.'),
    ('Гном', 'Мелкие изобретатели и мастера в области технологии и магии.'),
    ('Полурослик', 'Подвижные и обаятельные, отличные в хитрости и скрытности.'),
    ('Драконорожденный', 'Расы, унаследовавшие черты драконов, с различными способностями.'),
    ('Тифлинг', 'Потомки демонов или ангелов, обладают мистическими способностями.'),
    ('Полуэльф', 'Смесь человеческой и эльфийской крови, обладают частичной эльфийской грацией и человеческой универсальностью.'),
    ('Полуорк', 'Потомки орков и людей, сильные и устойчивые.'),
    ('Галфлинг', 'Маленькие, ловкие и умелые в скрытности и обходе препятствий.'),
    ('Аасимар', 'Потомки ангелов или других сверхъестественных существ, обладают священной магией и светлыми чертами.'),
    ('Фиолетовый червь', 'Таинственные и псионически одаренные существа, обладают уникальными способностями ума.'),
    ('Кенку', 'Птицеподобные существа, обладают великолепной ловкостью и преданностью.'),
    ('Лепрекон', 'Маленькие и хитрые, с талантом к уходу и обладатели некоторой магии.'),
    ('Табакси', 'Кошачьи люди, обладающие кошачьими чертами и ловкостью.'),
    ('Торболды', 'Медвежье-подобные существа, силой и выносливостью медведя.'),
    ('Юнги', 'Подводные существа с чертами рыб или морских обитателей, адаптированные к жизни в воде.');