// eslint-disable-next-line no-unused-vars
import DnDCharacter from "@models/DnDCharacter"

import Statbox from "./common/StatBox"
import StatRow from "./common/StatRow"
import Skill from "./common/Skill"
import StatBox2 from "./common/StatBox2"
import DeathSave from "./common/DeathSave"
import AttackTable from "./common/AttackTable"
import Currency from "./common/Currency"

import "./dndstyles.css"
import { Component } from "preact"
import { useAppSelector } from "@/redux/hooks"
import { DnDAligments } from "@/models/DnDAligments"
import { beautifyNumber, calcModifier, calculateSkill } from "./utils"

interface IDnDCharacterStatsSheetProps {
  character?: DnDCharacter
  defaultCharacter?: DnDCharacter
  onCharacterChanged?: (
    character: DnDCharacter,
    changedField: string,
    newValue: any
  ) => void
}

interface IDnDCharacterStatsSheetState {
  character: DnDCharacter
}

const initialState: IDnDCharacterStatsSheetState = {
  character: {},
}

class DnDCharacterStatsSheet extends Component<
  IDnDCharacterStatsSheetProps,
  IDnDCharacterStatsSheetState
> {
  constructor(props: IDnDCharacterStatsSheetProps) {
    super(props)
    if (props.defaultCharacter) {
      initialState.character = props.defaultCharacter
    }
    this.state = initialState
  }

  updateCharacter(name: string, value: any) {
    const oldCharacter = this.getCharacter()
    const newCharacter: DnDCharacter = {}
    Object.assign(newCharacter, oldCharacter)
    newCharacter[name] = value

    if (!this.props.character) {
      // NOT CONTROLLED
      this.setState({ character: newCharacter })
    }

    if (typeof this.props.onCharacterChanged === "function") {
      this.props.onCharacterChanged(newCharacter, name, value)
    }
  }

  getCharacter() {
    // NOT CONTROLLED
    let character = this.state.character
    if (this.props.character) {
      // CONTROLLED
      character = this.props.character
    }
    return character
  }

  render() {
    const character = this.getCharacter()
    const classes = useAppSelector(
      (state) => state.charactersSlice.hints.classes
    )
    const races = useAppSelector((state) => state.charactersSlice.hints.races)
    const backgrounds = useAppSelector(
      (state) => state.charactersSlice.hints.backgrounds
    )
    const factions = useAppSelector(
      (state) => state.charactersSlice.hints.factions
    )

    return (
      <div className="d-and-d-character-sheet container-xl mt-5 mb-5">
        <div>
          <div className="row mb-4">
            <div className="col-md-3 pr-2 pl-2">
              <div className="d-and-d-page-title">Dungeon & Dragons</div>
              <div className="d-and-d-attribute-collection char-name pr-3 pl-3">
                <input
                  type="text"
                  value={character.name ? character.name : ""}
                  onChange={(e) =>
                    this.updateCharacter(
                      "name",
                      (e.target as HTMLInputElement).value
                    )
                  }
                />
              </div>
              <label
                style={{
                  width: "100%",
                  textAlign: "right",
                  textTransform: "uppercase",
                  fontSize: "11px",
                }}
              >
                Character Name
              </label>
            </div>
            <div className="col-md-9 pr-2 pl-2">
              <div className="d-and-d-attribute-collection pr-3 pl-3">
                <div className="row pl-3 pr-3">
                  <div className="col-md-2 col-6 pl-0 pr-0">
                    <select
                      style={{ height: "24.5px" }}
                      value={character.class ? character.class : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "class",
                          (e.target as HTMLInputElement).value
                        )
                      }
                    >
                      {classes.map((c) => (
                        <option value={c.name}>{c.name}</option>
                      ))}
                    </select>
                    <label class="">Class</label>
                  </div>
                  <div className="col-md-1 col-6 pl-0 pr-0">
                    <input
                      type="number"
                      value={character.classLevel ? character.classLevel : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "classLevel",
                          (e.target as HTMLInputElement).value as string
                        )
                      }
                    />
                    <label>Level</label>
                  </div>
                  <div className="col-md-3 col-6 pl-0 pr-0">
                    <select
                      style={{ height: "24.5px" }}
                      value={character.background ? character.background : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "background",
                          (e.target as HTMLInputElement).value
                        )
                      }
                    >
                      {backgrounds.map((c) => (
                        <option value={c.name}>{c.name}</option>
                      ))}
                    </select>
                    <label>Background</label>
                  </div>
                  <div className="col-md-3 col-6 pl-0 pr-0">
                    <input
                      type="text"
                      value={character.playerName ? character.playerName : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "playerName",
                          (e.target as HTMLInputElement).value
                        )
                      }
                    />
                    <label>Player Name</label>
                  </div>
                  <div className="col-md-3 col-6 pl-0 pr-0">
                    <select
                      style={{ height: "24.5px" }}
                      value={character.faction ? character.faction : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "faction",
                          (e.target as HTMLInputElement).value
                        )
                      }
                    >
                      {factions.map((c) => (
                        <option value={c.name}>{c.name}</option>
                      ))}
                    </select>
                    <label>Faction</label>
                  </div>
                </div>
                <div className="row pl-3 pr-3">
                  <div className="col-md-3 col-6 pl-0 pr-0">
                    <select
                      style={{ height: "24.5px" }}
                      value={character.race ? character.race : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "race",
                          (e.target as HTMLInputElement).value
                        )
                      }
                    >
                      {races.map((c) => (
                        <option value={c.name}>{c.name}</option>
                      ))}
                    </select>
                    <label>Race</label>
                  </div>
                  <div className="col-md-3 col-6 pl-0 pr-0">
                  <select
                      style={{ height: "24.5px" }}
                      value={character.alignment ? character.alignment : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "alignment",
                          (e.target as HTMLInputElement).value
                        )
                      }
                    >
                      {Object.keys(DnDAligments).map((c) => (
                        <option value={c}>{DnDAligments[c]}</option>
                      ))}
                    </select>
                    <label>Alignment</label>
                  </div>
                  <div className="col-md-3 col-6 pl-0 pr-0">
                    <input
                      type="text"
                      value={character.xp ? character.xp : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "xp",
                          (e.target as HTMLInputElement).value
                        )
                      }
                    />
                    <label>Experience Points</label>
                  </div>
                  <div className="col-md-3 col-6 pl-0 pr-0">
                    <input
                      type="text"
                      value={character.dciNo ? character.dciNo : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "dciNo",
                          (e.target as HTMLInputElement).value
                        )
                      }
                    />
                    <label>DCI Number</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="row">
                <div className="col-4 pr-1">
                  <div className="d-and-d-box gray">
                    <Statbox
                      label="Strength"
                      name="str"
                      value={character.str}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                    <Statbox
                      label="Dexterity"
                      name="dex"
                      value={character.dex}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                    <Statbox
                      label="Constitution"
                      name="con"
                      value={character.con}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                    <Statbox
                      label="Intelligence"
                      name="ind"
                      value={character.ind}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                    <Statbox
                      label="Wisdom"
                      name="wis"
                      value={character.wis}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                    <Statbox
                      label="Charisma"
                      name="cha"
                      value={character.cha}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                  </div>
                </div>
                <div className="col-8">
                  <StatRow
                    label="Inspiration"
                    name="inspiration"
                    value={character.inspiration}
                    onChange={(name: string, value: any) => {
                      this.updateCharacter(name, value)
                    }}
                  />
                  <StatRow
                    classes="rounded"
                    label="Proficiency Bonus"
                    name="proficiencyBonus"
                    value={character.proficiencyBonus}
                    onChange={(name: string, value: any) => {
                      this.updateCharacter(name, value)
                    }}
                  />
                  <div className="d-and-d-box">
                    <div style={{ textAlign: "left" }}>
                      <Skill
                        label="Strength"
                        name="strSave"
                        value={calculateSkill(character.strSaveChecked, character.proficiencyBonus, character.str)}
                        checked={character.strSaveChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Dexterity"
                        name="dexSave"
                        value={calculateSkill(character.dexSaveChecked, character.proficiencyBonus, character.dex)}
                        checked={character.dexSaveChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Constitution"
                        name="conSave"
                        value={calculateSkill(character.conSaveChecked, character.proficiencyBonus, character.con)}
                        checked={character.conSaveChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Intelligence"
                        name="intSave"
                        value={calculateSkill(character.intSaveChecked, character.proficiencyBonus, character.ind)}
                        checked={character.intSaveChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Wisdom"
                        name="wisSave"
                        value={calculateSkill(character.wisSaveChecked, character.proficiencyBonus, character.wis)}
                        checked={character.wisSaveChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Charisma"
                        name="chaSave"
                        value={calculateSkill(character.chaSaveChecked, character.proficiencyBonus, character.cha)}
                        checked={character.chaSaveChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                    </div>
                    <label
                      className="d-and-d-title"
                      style={{ marginTop: "10px" }}
                    >
                      Saving Throws
                    </label>
                  </div>
                  <div className="d-and-d-box">
                    <div style={{ textAlign: "left" }}>
                      <Skill
                        label="Acrobatics"
                        hint="(Dex)"
                        name="skillAcrobatics"
                        value={calculateSkill(character.skillAcrobaticsChecked, character.proficiencyBonus, character.dex)}
                        checked={character.skillAcrobaticsChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Animal Handling"
                        hint="(Wis)"
                        name="skillAnimalHandling"
                        value={calculateSkill(character.skillAnimalHandlingChecked, character.proficiencyBonus, character.wis)}
                        checked={character.skillAnimalHandlingChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Arcana"
                        hint="(Int)"
                        name="skillArcana"
                        value={calculateSkill(character.skillArcanaChecked, character.proficiencyBonus, character.ind)}
                        checked={character.skillArcanaChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Athletics"
                        hint="(Str)"
                        name="skillAthletics"
                        value={calculateSkill(character.skillAthleticsChecked, character.proficiencyBonus, character.str)}
                        checked={character.skillAthleticsChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Deception"
                        hint="(Cha)"
                        name="skillDeception"
                        value={calculateSkill(character.skillDeceptionChecked, character.proficiencyBonus, character.cha)}
                        checked={character.skillDeceptionChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="History"
                        hint="(Int)"
                        name="skillHistory"
                        value={calculateSkill(character.skillHistoryChecked, character.proficiencyBonus, character.ind)}
                        checked={character.skillHistoryChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Insight"
                        hint="(Wis)"
                        name="skillInsight"
                        value={calculateSkill(character.skillInsightChecked, character.proficiencyBonus, character.wis)}
                        checked={character.skillInsightChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Intimidation"
                        hint="(Cha)"
                        name="skillIntimidation"
                        value={calculateSkill(character.skillIntimidationChecked, character.proficiencyBonus, character.cha)}
                        checked={character.skillIntimidationChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Investigation"
                        hint="(Int)"
                        name="skillInvestigation"
                        value={calculateSkill(character.skillInvestigationChecked, character.proficiencyBonus, character.ind)}
                        checked={character.skillInvestigationChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Medicine"
                        hint="(Wis)"
                        name="skillMedicine"
                        value={calculateSkill(character.skillMedicineChecked, character.proficiencyBonus, character.wis)}
                        checked={character.skillMedicineChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Nature"
                        hint="(Int)"
                        name="skillNature"
                        value={calculateSkill(character.skillNatureChecked, character.proficiencyBonus, character.ind)}
                        checked={character.skillNatureChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Perception"
                        hint="(Wis)"
                        name="skillPerception"
                        value={calculateSkill(character.skillPerceptionChecked, character.proficiencyBonus, character.wis)}
                        checked={character.skillPerceptionChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Performance"
                        hint="(Cha)"
                        name="skillPerformance"
                        value={calculateSkill(character.skillPerformanceChecked, character.proficiencyBonus, character.cha)}
                        checked={character.skillPerformanceChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Persuasion"
                        hint="(Cha)"
                        name="skillPersuasion"
                        value={calculateSkill(character.skillPersuasionChecked, character.proficiencyBonus, character.cha)}
                        checked={character.skillPersuasionChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Religion"
                        hint="(Int)"
                        name="skillReligion"
                        value={calculateSkill(character.skillReligionChecked, character.proficiencyBonus, character.ind)}
                        checked={character.skillReligionChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Sleight of Hand"
                        hint="(Dex)"
                        name="skillSlightOfHand"
                        value={calculateSkill(character.skillSlightOfHandChecked, character.proficiencyBonus, character.dex)}
                        checked={character.skillSlightOfHandChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Stealth"
                        hint="(Dex)"
                        name="skillStealth"
                        value={calculateSkill(character.skillStealthChecked, character.proficiencyBonus, character.dex)}
                        checked={character.skillStealthChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <Skill
                        label="Survival"
                        hint="(Wis)"
                        name="skillSurvival"
                        value={calculateSkill(character.skillSurvivalChecked, character.proficiencyBonus, character.wis)}
                        checked={character.skillSurvivalChecked}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                    </div>
                    <label
                      className="d-and-d-title"
                      style={{ marginTop: "10px" }}
                    >
                      Skills
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <StatRow
                  classes="rounded rounded-sides"
                  label="Passive Wisdom (Perception)"
                  name="passivePerception"
                  value={character.passivePerception}
                  onChange={(name: string, value: any) => {
                    this.updateCharacter(name, value)
                  }}
                />
              </div>
              <div className="d-and-d-box mt-4">
                <textarea
                  value={
                    character.otherProficiencies
                      ? character.otherProficiencies
                      : ""
                  }
                  onChange={(e) =>
                    this.updateCharacter(
                      "otherProficiencies",
                      (e.target as HTMLInputElement).value
                    )
                  }
                  rows={12}
                />
                <label className="d-and-d-title" style={{ marginTop: "10px" }}>
                  Other Proficiencies & Languages
                </label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-and-d-box gray">
                <div className="row">
                  <div className="col-4 pr-2">
                    <StatBox2
                      classes="shield"
                      labelTop="Armour"
                      label="Class"
                      name="ac"
                      value={character.ac}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                  </div>
                  <div className="col-4 pr-2 pl-2">
                    <StatBox2
                      label="Initiative"
                      name="init"
                      value={character.init}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                  </div>
                  <div className="col-4 pl-2">
                    <StatBox2
                      label="Speed"
                      name="speed"
                      value={character.speed}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                  </div>
                </div>

                <div
                  className="d-and-d-box white"
                  style={{
                    borderRadius: "8px 8px 0 0",
                    marginBottom: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  <div className="d-and-d-gray-text">
                    <label style={{ width: "95px" }}>Hit Point Maximum</label>
                    <input
                      type="text"
                      style={{ width: "calc(100% - 95px)" }}
                      className="d-and-d-linput"
                      value={character.maxHp ? character.maxHp : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "maxHp",
                          (e.target as HTMLInputElement).value
                        )
                      }
                    />
                  </div>
                  <input
                    type="text"
                    className="d-and-d-cinput"
                    value={character.hp ? character.hp : ""}
                    onChange={(e) =>
                      this.updateCharacter(
                        "hp",
                        (e.target as HTMLInputElement).value
                      )
                    }
                  />
                  <label className="d-and-d-title" style={{ marginTop: "5px" }}>
                    Current Hit Points
                  </label>
                </div>
                <div
                  className="d-and-d-box white mb-2"
                  style={{ borderRadius: "0 0 8px 8px", paddingBottom: "5px" }}
                >
                  <input
                    type="text"
                    className="d-and-d-cinput"
                    value={character.tempHp ? character.tempHp : ""}
                    onChange={(e) =>
                      this.updateCharacter(
                        "tempHp",
                        (e.target as HTMLInputElement).value
                      )
                    }
                  />
                  <label className="d-and-d-title" style={{ marginTop: "5px" }}>
                    Temporary Hit Points
                  </label>
                </div>

                <div className="row mt-1">
                  <div className="col-6 pr-1">
                    <div
                      className="d-and-d-box white mb-0"
                      style={{ paddingBottom: "5px" }}
                    >
                      <div className="d-and-d-gray-text">
                        <label style={{ width: "25px" }}>Total</label>
                        <input
                          type="text"
                          style={{ width: "calc(100% - 25px)" }}
                          className="d-and-d-linput"
                          value={
                            character.hitDiceMax ? character.hitDiceMax : ""
                          }
                          onChange={(e) =>
                            this.updateCharacter(
                              "hitDiceMax",
                              (e.target as HTMLInputElement).value
                            )
                          }
                        />
                      </div>
                      <input
                        type="text"
                        className="d-and-d-cinput"
                        value={character.hitDice ? character.hitDice : ""}
                        onChange={(e) =>
                          this.updateCharacter(
                            "hitDice",
                            (e.target as HTMLInputElement).value
                          )
                        }
                      />
                      <label
                        className="d-and-d-title"
                        style={{ marginTop: "5px" }}
                      >
                        Hit Dice
                      </label>
                    </div>
                  </div>
                  <div className="col-6 pl-1">
                    <div
                      className="d-and-d-box white mb-0"
                      style={{ paddingBottom: "5px" }}
                    >
                      <DeathSave
                        classes="d-and-d-save-success"
                        label="Successes"
                        name="deathsaveSuccesses"
                        value={character.deathsaveSuccesses}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <DeathSave
                        classes="d-and-d-save-failure"
                        label="Failures"
                        name="deathsaveFailures"
                        value={character.deathsaveFailures}
                        onChange={(name: string, value: any) => {
                          this.updateCharacter(name, value)
                        }}
                      />
                      <label
                        className="d-and-d-title"
                        style={{ marginTop: "6px" }}
                      >
                        Death Saves
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-and-d-box mt-3">
                <AttackTable
                  rows={3}
                  name="attacks"
                  value={character.attacks}
                  onChange={(name: string, value: any) => {
                    console.log("char: ", name, value)
                    this.updateCharacter(name, value)
                  }}
                />
                <textarea
                  value={character.attacksText ? character.attacksText : ""}
                  onChange={(e) =>
                    this.updateCharacter(
                      "attacksText",
                      (e.target as HTMLInputElement).value
                    )
                  }
                  rows={6}
                />
                <label className="d-and-d-title" style={{ marginTop: "10px" }}>
                  Attacks & Spellcasting
                </label>
              </div>

              <div className="d-and-d-box mt-4">
                <div className="row">
                  <div className="" style={{ width: "100px" }}>
                    <Currency
                      label="CP"
                      name="cp"
                      value={character.cp}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                    <Currency
                      label="SP"
                      name="sp"
                      value={character.sp}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                    <Currency
                      label="EP"
                      name="ep"
                      value={character.ep}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                    <Currency
                      label="GP"
                      name="gp"
                      value={character.gp}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                    <Currency
                      label="PP"
                      name="pp"
                      value={character.pp}
                      onChange={(name: string, value: any) => {
                        this.updateCharacter(name, value)
                      }}
                    />
                  </div>
                  <div className="col">
                    <textarea
                      className="d-and-d-equipment-indent"
                      value={character.equipment ? character.equipment : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "equipment",
                          (e.target as HTMLInputElement).value
                        )
                      }
                      rows={10}
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      value={character.equipment2 ? character.equipment2 : ""}
                      onChange={(e) =>
                        this.updateCharacter(
                          "equipment2",
                          (e.target as HTMLInputElement).value
                        )
                      }
                      rows={4}
                    />
                  </div>
                </div>
                <label className="d-and-d-title" style={{ marginTop: "10px" }}>
                  Equipment
                </label>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="d-and-d-box gray"
                style={{ marginBottom: "17px" }}
              >
                <div
                  className="d-and-d-box white"
                  style={{
                    borderRadius: "8px 8px 0 0",
                    marginBottom: "5px",
                    paddingTop: "1px",
                    paddingBottom: "5px",
                  }}
                >
                  <textarea
                    value={
                      character.personalityTraits
                        ? character.personalityTraits
                        : ""
                    }
                    onChange={(e) =>
                      this.updateCharacter(
                        "personalityTraits",
                        (e.target as HTMLInputElement).value
                      )
                    }
                    rows={3}
                  />
                  <label className="d-and-d-title">Personality Traits</label>
                </div>
                <div
                  className="d-and-d-box white"
                  style={{
                    borderRadius: "0 0 0 0",
                    marginBottom: "5px",
                    paddingTop: "1px",
                    paddingBottom: "5px",
                  }}
                >
                  <textarea
                    value={character.ideals ? character.ideals : ""}
                    onChange={(e) =>
                      this.updateCharacter(
                        "ideals",
                        (e.target as HTMLInputElement).value
                      )
                    }
                    rows={3}
                  />
                  <label className="d-and-d-title">Ideals</label>
                </div>
                <div
                  className="d-and-d-box white"
                  style={{
                    borderRadius: "0 0 0 0",
                    marginBottom: "5px",
                    paddingTop: "1px",
                    paddingBottom: "5px",
                  }}
                >
                  <textarea
                    value={character.bonds ? character.bonds : ""}
                    onChange={(e) =>
                      this.updateCharacter(
                        "bonds",
                        (e.target as HTMLInputElement).value
                      )
                    }
                    rows={2}
                  />
                  <label className="d-and-d-title">Bonds</label>
                </div>
                <div
                  className="d-and-d-box white"
                  style={{
                    borderRadius: "0 0 8px 8px",
                    marginBottom: "0px",
                    paddingTop: "1px",
                    paddingBottom: "4px",
                  }}
                >
                  <textarea
                    value={character.flaws ? character.flaws : ""}
                    onChange={(e) =>
                      this.updateCharacter(
                        "flaws",
                        (e.target as HTMLInputElement).value
                      )
                    }
                    rows={2}
                  />
                  <label className="d-and-d-title">Flaws</label>
                </div>
              </div>
              <div className="d-and-d-box mt-3">
                <textarea
                  style={{ paddingBottom: "5px" }}
                  value={
                    character.featuresTraits ? character.featuresTraits : ""
                  }
                  onChange={(e) =>
                    this.updateCharacter(
                      "featuresTraits",
                      (e.target as HTMLInputElement).value
                    )
                  }
                  rows={27}
                />
                <label className="d-and-d-title" style={{ marginTop: "10px" }}>
                  Features & Traits
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DnDCharacterStatsSheet
