import { DnDCharacterList } from "@components/DnDCharacterList"
import { useAppDispatch } from "@redux/hooks"
import { PlusIcon } from "@components/icons/PlusIcon"
import { loadAllCharacters, newCharacter } from "@redux/charactersSlice"
import { useLocation } from "preact-iso"
import { useEffect } from "preact/hooks"

export function Home() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(loadAllCharacters())
  }, [dispatch])

  return (
    <>
      <div class="flex justify-center mt-[40px]">
        <PlusIcon
          class="cursor-pointer hover:scale-110 transition-all ease-out"
          onClick={() => {
            dispatch(newCharacter()), location.route("/stats")
          }}
        />
      </div>
      <DnDCharacterList />
    </>
  )
}
