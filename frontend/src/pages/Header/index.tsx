import DnDCharacter from "@models/DnDCharacter"
import { useLocation } from "preact-iso"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import {
  postCharacter,
  saveSelectedCharacter,
  unselectCharacter,
  updateCharacter,
  updateCharacterThunk,
} from "@redux/charactersSlice"
import { HTMLProps, useEffect, useState } from "preact/compat"
import { auth, logout, signUp, tryAuth } from "@/redux/userSlice"
import UserAuth from "./auth"

const buttons: { route: string; label: string }[] = [
  // { label: "Home", route: "/" },
  { label: "Stats", route: "/stats" },
  { label: "Profile", route: "/profile" },
  { label: "Spell", route: "/spell" },
]

export function Header() {
  const location = useLocation()
  const character = useAppSelector(
    (state) => state.charactersSlice.currentCharacter
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tryAuth())
  }, [dispatch])

  return (
    <div class="sticky top-0 z-50 mt-2">
      <div class="bg-dark-gray max-w-[1100px] mx-auto flex px-3 py-2 gap-6  justify-between text-center text-light-text text-[18px] rounded-md">
        <div class="flex gap-3">
          <button class="font-bold outline-none focus:outline-none" onClick={() => location.route('/')}>D&D Lists</button>
        </div>
        <div class="flex justify-end">
          <UserAuth />
        </div>
      </div>
      {character && <SelectedCharacter character={character} />}{" "}
    </div>
  )
}

const Button = (props: HTMLProps<HTMLDivElement> & { label: string }) => {
  return (
    <div class={props.class} onClick={props.onClick}>
      {props.label}
    </div>
  )
}

type SelectedCharacterProps = {
  character?: DnDCharacter
}

const SelectedCharacter = (props: SelectedCharacterProps) => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.userSlice.auth)
  const location = useLocation()
  return (
    <div class="bg-dark-gray text-light-text max-w-[1100px] mt-2 gap-2 mx-auto flex flex-col p-2 text-center rounded-md">
      <div class="flex justify-between">
        <span>
          Выбран:{" "}
          <span class="font-semibold">
            {props.character.name && props.character.name.length > 0
              ? props.character.name
              : "Nameless"}
          </span>
          {", "}
          <span class="font-semibold">
            {props.character.class
              ? props.character.class
              : "Class - not selected"}
          </span>
          <span class="font-semibold">
            {props.character.classLevel &&
            Number(props.character.classLevel) > 0
              ? " " + props.character.classLevel
              : ""}
          </span>
        </span>

        <div class="flex gap-1.5">
          <Button
            class="w-20 header-button "
            onClick={() => {
              dispatch(unselectCharacter()), location.route("/")
            }}
            label={"Cancel"}
          />

          {auth.authenticated ? (
            <Button
              class="w-20 header-button"
              onClick={() => {
                dispatch(saveSelectedCharacter())
                if (!props.character.id || props.character.id.length === 0) {
                  dispatch(postCharacter())
                  console.log("create")
                } else {
                  dispatch(updateCharacterThunk())
                  console.log("update")
                }
              }}
              label={"Save"}
            />
          ) : (
            <>
              <Button
                class="w-30 header-button"
                label={"Save"}
                onClick={() => alert("Login to Save")}
              />
            </>
          )}
        </div>
      </div>

      <div class="flex justify-start gap-2">
        {props.character && (
          <>
            {buttons.map((b, i) => (
              <Button
                key={i}
                class={`w-20 header-button ${
                  b.route === location.url ? " header-button-active" : ""
                }`}
                onClick={() => location.route(b.route)}
                label={b.label}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
