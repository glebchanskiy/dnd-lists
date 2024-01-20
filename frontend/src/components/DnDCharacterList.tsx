import DnDCharacter from "@models/DnDCharacter"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { HTMLProps } from "preact/compat"
import { changeSelectedCharacter } from "../redux/charactersSlice"
import { useLocation } from "preact-iso"

type DnDCharacterListProps = {}

export const DnDCharacterList = (props: DnDCharacterListProps) => {
  const location = useLocation()
  const characters = useAppSelector((state) => state.charactersSlice.characters)
  const currentChar = useAppSelector((state) => state.charactersSlice.currentCharacter)
  const dispatch = useAppDispatch()

  return (
    <div class="flex flex-col py-10 gap-8">
      {characters.map((c) => (
        <DnDCharacterCard
          character={c}
          onClick={() => {dispatch(changeSelectedCharacter(c)), location.route('/stats')}}
          class={currentChar && currentChar.id === c.id ? 'bg-gray-100' : ''}
        />
      ))}
      {(!characters || characters.length === 0) && <div class='text-center'><span>Пусто (</span></div>}
    </div>
  )
}

const cutText = (text: string, n: number) => {
  while (n) {
    if (text[n++] == " ") {
      break
    }
  }

  return text.substring(0, n - 1)
}

const findArt = (characterClass: string) => {
  const c = characterClass?.toLowerCase() ?? "warrior"
  // if (["warrior", "воин"].includes(c)) return "/assets/war1.png"
  // else if (["barbarian", "варвар"].includes(c))
  //   return "/assets/barbarian.jpeg"
  // else if (["cleric", "жрец"].includes(c)) return "/assets/cleric.jpeg"
  // else if (["druid", "друид"].includes(c)) return "/assets/druid.jpeg"
  // else if (["pal", "паладин"].includes(c)) return "/assets/pal.png"
  // else if (["warlock", "чародей"].includes(c)) return "/assets/warlock.jpeg"
  // else if (["wizard", "волшебник"].includes(c)) return "/assets/wizard.jpeg"
  // else if (["изобретатель", "artificer"].includes(c)) return "/assets/artificer.jpg"
  // else if (["bard", "бард"].includes(c)) return "/assets/bard.jpeg"
  if (["warrior", "воин"].includes(c)) return "/src/assets/war1.png"
    else if (["barbarian", "варвар"].includes(c))
    return "/src/assets/barbarian.jpeg"
  else if (["cleric", "жрец"].includes(c)) return "/src/assets/cleric.jpeg"
  else if (["druid", "друид"].includes(c)) return "/src/assets/druid.jpeg"
  else if (["pal", "паладин"].includes(c)) return "/src/assets/pal.png"
  else if (["warlock", "чародей"].includes(c)) return "/src/assets/warlock.jpeg"
  else if (["wizard", "волшебник"].includes(c)) return "/src/assets/wizard.jpeg"
  else if (["bard", "бард"].includes(c)) return "/src/assets/bard.jpeg"
  else if (["изобретатель", "artificer"].includes(c)) return "/src/assets/artificer.jpg"
}

type DnDCharacterCardProps = {
  character: DnDCharacter
} & HTMLProps<HTMLDivElement>

const DnDCharacterCard = (props: DnDCharacterCardProps) => {
  const info =
    props.character.backstory ?? props.character.ideals ?? "Без описания"
  const infoMaxLength = 222
  console.log('character: ', props.character)
  return (
    <div
      onClick={props.onClick}
      class={`w-3/4 mx-auto cursor-pointer max-h-64 overflow-y-hidden flex flex-col border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 ${props.class}`}
    >
      <img
        class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={props.character.appearance ?? findArt(props.character.class)}
        alt=""
      />
      <div class="flex flex-col p-4 leading-normal">
        <h5 class="flex flex-wrap gap-x-2 mb-2 text-2xl font-bold tracking-tight">
          <span class="font-bold text-nowrap">{props.character.name},</span>
          <span class="font-semibold text-nowrap">
            {props.character.class} {props.character.classLevel}
          </span>
          <span class="font-semibold text-nowrap">{props.character.race}</span>
        </h5>
        <p class="flex mb-3 font-normal ">
          {`${
            info.length > infoMaxLength
              ? cutText(info, infoMaxLength) + "..."
              : info
          }`}
        </p>
      </div>
    </div>
  )
}
