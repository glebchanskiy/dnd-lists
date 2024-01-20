import DnDCharacterStatsSheet from "@components/DnDCharacterStatsSheet"
import { updateCharacter } from "@redux/charactersSlice"
import { useAppDispatch, useAppSelector } from "@redux/hooks"

export function DnDCharacterStatsSheetPage() {
		const dispatch = useAppDispatch()
		const character = useAppSelector((state) => state.charactersSlice.currentCharacter)
  return (
    <div class="container flex max-w-[1100px]">
      <DnDCharacterStatsSheet character={character} onCharacterChanged={(char) => dispatch(updateCharacter(char))} />
    </div>
  )
}
