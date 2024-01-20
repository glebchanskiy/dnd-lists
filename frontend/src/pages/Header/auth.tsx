import { loadAllCharacters } from "@/redux/charactersSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { auth, logout, signUp, tryAuth } from "@/redux/userSlice"
import { HTMLProps } from "preact/compat"
import { useEffect, useState } from "preact/hooks"

const UserAuth = () => {
  const dispatch = useAppDispatch()

  const authData = useAppSelector((state) => state.userSlice.auth)

  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignIn] = useState(false)

  const closeLogin = () => setOpenLogin(false)
  const closeSigUp = () => setOpenSignIn(false)

  useEffect(() => {
    dispatch(tryAuth())
  }, [dispatch])

  return (
    <div class="" style={{ width: "100%" }}>
      {authData.authenticated ? (
        <>
          <Authenticated />
        </>
      ) : (
        <div>
          <div class='flex gap-2'>
            {!openSignUp && (
              <Login
                close={closeLogin}
                onClick={() => setOpenLogin(true)}
                isOpen={openLogin}
              />
            )}
            {!openLogin && (
              <SignUp
                close={closeSigUp}
                onClick={() => setOpenSignIn(true)}
                isOpen={openSignUp}
              />
            )}
          </div>
          {!openLogin && !openSignUp && <span>{authData.message}</span>}
        </div>
      )}
    </div>
  )
}

const Authenticated = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.userSlice.auth)
  return (
    <div class='flex gap-2'>
      <div>{auth.username}</div>
      <button class="block header-button" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  )
}

const SignUp = (
  props: HTMLProps<HTMLButtonElement> & { isOpen: boolean; close: () => void }
) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      {!props.isOpen ? (
        <button class="block header-button" onClick={props.onClick}>
          SignUp
        </button>
      ) : (
        <div
          class="flex items-center gap-2"
        >
          <label htmlFor="name">username</label>
          <input
            onChange={(e) => setUsername(e.currentTarget.value)}
            id="name"
            type="text"
          />

          <label htmlFor="password">password</label>
          <input
            onChange={(e) => setPassword(e.currentTarget.value)}
            id="password"
            type="password"
          />

          <button
            class="block header-button"
            onClick={() => {
              dispatch(
                signUp({
                  email: username,
                  password,
                  role: "ROLE_USER",
                })
              ).then((ignored) => {
                dispatch(auth({ email: username, password }))
                setPassword("")
                setUsername("")
                props.close()
              })
            }}
          >
            SignUp
          </button>
        </div>
      )}
    </>
  )
}

const Login = (
  props: HTMLProps<HTMLButtonElement> & { isOpen: boolean; close: () => void }
) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      {!props.isOpen ? (
        <button class="block header-button" onClick={props.onClick}>
          Login
        </button>
      ) : (
        <div class="flex items-center gap-2">
          <label htmlFor="name">username</label>
          <input
            onChange={(e) => setUsername(e.currentTarget.value)}
            id="name"
            type="text"
          />

          <label htmlFor="password">password</label>
          <input
            onChange={(e) => setPassword(e.currentTarget.value)}
            id="password"
            type="password"
          />

          <button
            class="block header-button"
            onClick={() => {
              dispatch(auth({ email: username, password })).then(i=> dispatch(loadAllCharacters())), props.close()
            }}
          >
            Login
          </button>
        </div>
      )}
    </>
  )
}

export default UserAuth
