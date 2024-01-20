import DnDCharacterSpellsSheet from "@components/DnDCharacterSpellSheet"
import { updateCharacter } from "@redux/charactersSlice"
import { useAppDispatch, useAppSelector } from "@redux/hooks"

export function DnDCharacterSpellSheetPagePage() {
	const dispatch = useAppDispatch()
	const character = useAppSelector((state) => state.charactersSlice.currentCharacter)
	return (
			<div class="container flex max-w-[1100px]">
					<DnDCharacterSpellsSheet character={character} onCharacterChanged={(char) => dispatch(updateCharacter(char))} />
			</div>
	)
}
