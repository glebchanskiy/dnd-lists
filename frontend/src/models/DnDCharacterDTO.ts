import { DnDBackground } from "./DnDBackground"
import { DnDClass } from "./DnDClass"
import { DnDFaction } from "./DnDFaction"
import { DnDRace } from "./DnDRace"

export type DnDCharacterDTO = {
  id?: number
  name?: string
  dndClass?: DnDClass
  // playerNameId?: {email: string}
  classLevel?: string
  background?: DnDBackground
  playerName?: string
  faction?: DnDFaction
  race?: DnDRace
  alignment?: string
  xp?: string
  dciNo?: string

  str?: string
  dex?: string
  con?: string
  int?: string
  wis?: string
  cha?: string

  inspiration?: string
  proficiencyBonus?: string

  strSave?: string
  strSaveChecked?: boolean
  dexSave?: string
  dexSaveChecked?: boolean
  conSave?: string
  conSaveChecked?: boolean
  intSave?: string
  intSaveChecked?: boolean
  wisSave?: string
  wisSaveChecked?: boolean
  chaSave?: string
  chaSaveChecked?: boolean

  skillAcrobatics?: string
  skillAcrobaticsChecked?: boolean
  skillAnimalHandling?: string
  skillAnimalHandlingChecked?: boolean
  skillArcana?: string
  skillArcanaChecked?: boolean
  skillAthletics?: string
  skillAthleticsChecked?: boolean
  skillDeception?: string
  skillDeceptionChecked?: boolean
  skillHistory?: string
  skillHistoryChecked?: boolean
  skillInsight?: string
  skillInsightChecked?: boolean
  skillIntimidation?: string
  skillIntimidationChecked?: boolean
  skillInvestigation?: string
  skillInvestigationChecked?: boolean
  skillMedicine?: string
  skillMedicineChecked?: boolean
  skillNature?: string
  skillNatureChecked?: boolean
  skillPerception?: string
  skillPerceptionChecked?: boolean
  skillPerformance?: string
  skillPerformanceChecked?: boolean
  skillPersuasion?: string
  skillPersuasionChecked?: boolean
  skillReligion?: string
  skillReligionChecked?: boolean
  skillSlightOfHand?: string
  skillSlightOfHandChecked?: boolean
  skillStealth?: string
  skillStealthChecked?: boolean
  skillSurvival?: string
  skillSurvivalChecked?: boolean

  passivePerception?: string
  otherProficiencies?: string

  ac?: string
  init?: string
  speed?: string

  maxHp?: string
  hp?: string
  tempHp?: string

  hitDiceMax?: string
  hitDice?: string

  deathsaveSuccesses?: number
  deathsaveFailures?: number

  attacks?: string
  attacksText?: string

  cp?: string
  sp?: string
  ep?: string
  gp?: string
  pp?: string
  equipment?: string
  equipment2?: string

  personalityTraits?: string
  ideals?: string
  bonds?: string
  flaws?: string

  featuresTraits?: string

  age?: string
  height?: string
  weight?: string
  eyes?: string
  skin?: string
  hair?: string

  appearance?: string
  backstory?: string

  factionImg?: string
  factionRank?: string
  allies?: string
  allies2?: string

  additionalFeatures?: string
  additionalFeatures2?: string

  totalNonConsumableMagicItems?: string
  treasure?: string
  treasure2?: string

  spellcastingClass?: string
  preparedSpellsTotal?: string
  spellSaveDC?: string
  spellAttackBonus?: string

  cantrips?: string

  lvl1SpellSlotsTotal?: string
  lvl1SpellSlotsUsed?: number
  lvl1Spells?: string

  lvl2SpellSlotsTotal?: string
  lvl2SpellSlotsUsed?: number
  lvl2Spells?: string

  lvl3SpellSlotsTotal?: string
  lvl3SpellSlotsUsed?: number
  lvl3Spells?: string

  lvl4SpellSlotsTotal?: string
  lvl4SpellSlotsUsed?: number
  lvl4Spells?: string

  lvl5SpellSlotsTotal?: string
  lvl5SpellSlotsUsed?: number
  lvl5Spells?: string

  lvl6SpellSlotsTotal?: string
  lvl6SpellSlotsUsed?: number
  lvl6Spells?: string

  lvl7SpellSlotsTotal?: string
  lvl7SpellSlotsUsed?: number
  lvl7Spells?: string

  lvl8SpellSlotsTotal?: string
  lvl8SpellSlotsUsed?: number
  lvl8Spells?: string

  lvl9SpellSlotsTotal?: string
  lvl9SpellSlotsUsed?: number
  lvl9Spells?: string
}
