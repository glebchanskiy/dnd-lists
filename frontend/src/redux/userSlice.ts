import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";


export interface AuthResponse {
  token: string
}

export interface AuthBadResponse {
  message: string
}

export interface UserAuthData {
  email: string,
  password: string
}

export type ROLE = 'ROLE_USER' | 'ROLE_ADMIN'

export interface UserSignUpData {
  email: string,
  password: string,
  role: ROLE,
  iconStr?: string
}


type AuthState = { authenticated: boolean, message?: string, username?: string }
export interface UserState {
  auth: AuthState
}

const initialState: UserState = {
  auth: {
    authenticated: false,
  }
}

export const auth = createAsyncThunk('user/auth', async (userData: UserAuthData, { rejectWithValue }) => {
  return fetch('http://localhost:8080/api/v1/dnd/auth', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      
    },
  })
    .then((response) => {
      if (response.ok)
        return response.json() as Promise<AuthResponse>
      throw new Error('Errorrrrrrr');
    })
});

export const signUp = createAsyncThunk('user/signup', async (userData: UserSignUpData, { rejectWithValue }) => {
  return fetch('http://localhost:8080/api/v1/dnd/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then((response) => {
      console.log(response)
      if (response.ok)
        return response.json() as Promise<AuthResponse>
      throw new Error('Errorrrrrrr');
    })
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      const cookies = new Cookies();
      cookies.remove('jwt')
      state.auth = logoutState()
    },
    tryAuth: (state) => {
      const cookies = new Cookies();
      const token = cookies.get('jwt')

      if (token) {
        const { email: username } = jwtDecode<{ email: string }>(token)
        state.auth = loginState({ username })
        console.log(`Token founded, user [${username}] authenticated`)
      } else {
        console.log('Token NOT founded')
        state.auth = logoutState()
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.fulfilled, (state, action) => {
        console.log('fulfilled: ', action.payload.token)
        if (action.payload.token) {
          const cookies = new Cookies();
          cookies.remove('jwt')
          console.log('new token: ', action.payload.token)
          cookies.set('jwt', action.payload.token, { path: '/', expires: new Date(new Date().getTime() + (30 * 60 * 1000)) }); // 30 minutes expiration
          const { email: username } = jwtDecode<{ email: string }>(action.payload.token)
          state.auth = loginState({ username })
        }
      })
      .addCase(auth.rejected, (state) => {
        state.auth.message = 'Wrong password or username'
        state.auth.authenticated = false
      })
    builder
      .addCase(signUp.fulfilled, (state) => {
        state.auth.message = undefined
      })
  }
})

const logoutState = (): AuthState => {
  return { authenticated: false, message: undefined, username: undefined }
}

const loginState = ({ message = undefined, username }: { message?: string, username?: string }): AuthState => {
  return { authenticated: true, message, username }
}

export const { tryAuth, logout } = userSlice.actions

export default userSlice.reducer