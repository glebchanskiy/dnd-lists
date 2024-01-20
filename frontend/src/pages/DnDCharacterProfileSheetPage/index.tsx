import DnDCharacterProfileSheet from "@components/DnDCharacterProfileSheet"
import { updateCharacter } from "@redux/charactersSlice"
import { useAppDispatch, useAppSelector } from "@redux/hooks"

export function DnDCharacterProfileSheetPage() {
	const dispatch = useAppDispatch()
	const character = useAppSelector((state) => state.charactersSlice.currentCharacter)
	return (
			<div class="container flex max-w-[1100px] ">
					<DnDCharacterProfileSheet character={character} onCharacterChanged={(char) => dispatch(updateCharacter(char))} />
			</div>
	)
}
