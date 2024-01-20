import { backgrounds, races, classes, factions } from './data2';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import DnDCharacter from '@models/DnDCharacter'
import { DnDRace } from '@models/DnDRace'
import { DnDClass } from '@models/DnDClass'
import { DnDFaction } from '@models/DnDFaction'
import { DnDBackground } from '@models/DnDBackground';
import axios from 'axios';
import { RootState } from './store';
import { logout } from './userSlice';
import { createAxiosHeadersWithToken, dtoToObject, mapToDTO, tokenExist } from './utils';

interface User {
  username: string
}

interface SlicerState {
  login: {
    user?: User
  },
  hints: {
    races: DnDRace[],
    classes: DnDClass[],
    factions: DnDFaction[],
    backgrounds: DnDBackground[],
  },
  characters: DnDCharacter[],
  currentCharacter?: DnDCharacter
}

// Define the initial state using that type
const initialState: SlicerState = {
  login: {
    user: undefined
  },
  hints: {
    races,
    classes,
    backgrounds,
    factions
  },
  // characters: chars,
  characters: [],
  currentCharacter: undefined
}

export const loadAllCharacters = createAsyncThunk("slicer/loadAllCharacters", async () => {
  return axios
    .get(
      `http://localhost:8080/api/v1/characters`,
      { headers: createAxiosHeadersWithToken() }
    )
    .then(response => response.data)
    .then(data => data.map(dto => dtoToObject(dto)))
})

export const postCharacter = createAsyncThunk("slicer/postCharacter", async (arg, { getState }) => {
  const currentChar = (getState() as RootState).charactersSlice.currentCharacter

  if (tokenExist() && currentChar) {
    const body = mapToDTO(currentChar)

    return axios
      .post(
        `http://localhost:8080/api/v1/characters`,
        body,
        { headers: createAxiosHeadersWithToken() }
      )
      .then((data) => data.data);
  } else {
    alert('There is no need to save an empty sheet.\nWrite down at least the name and class of the character.')
  }
})

export const updateCharacterThunk = createAsyncThunk("slicer/updateCharacter", async (arg, { getState }) => {
  const currentChar = (getState() as RootState).charactersSlice.currentCharacter

  if (tokenExist() && currentChar) {
    const body = mapToDTO(currentChar)

    return axios
      .post(
        `http://localhost:8080/api/v1/characters/` + body.id,
        body,
        { headers: createAxiosHeadersWithToken() }
      )
      .then((data) => data.data);
  } else {
    alert('There is no need to save an empty sheet.\nWrite down at least the name and class of the character.')
  }
})

export const charactersSlice = createSlice({
  name: 'slicer',
  initialState,
  reducers: {
    updateCharacter: (state, action: PayloadAction<DnDCharacter>) => {
      console.log('update: ', action.payload)
      state.currentCharacter = action.payload
    },
    changeSelectedCharacter: (state, action: PayloadAction<DnDCharacter>) => {
      console.log('changeSelectedCharacter: ', action.payload)
      state.currentCharacter = action.payload
    },
    saveSelectedCharacter: (state) => {
      if (state.currentCharacter.name && state.currentCharacter.classLevel && state.currentCharacter.name.length > 0 && state.currentCharacter.classLevel.length > 0) {
        const withoutCurrent = state.characters.filter((c) => c.id !== state.currentCharacter.id)
        withoutCurrent.push(state.currentCharacter)
        state.characters = [...withoutCurrent]
      } else {
        alert('There is no need to save an empty sheet.\nWrite down at least the name and class of the character.')
      }
    },
    unselectCharacter: (state) => {
      state.currentCharacter = undefined
    },
    newCharacter: (state) => {
      state.currentCharacter = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllCharacters.fulfilled, (state, actione) => {
        console.log('chars: ', actione.payload)
        state.characters = [...actione.payload]
      })

      .addCase(saveSelectedCharacter, (state, actione) => {
      })
      .addCase(logout, (state, action) => {
        state.characters = []
      })
  }
})

export const { updateCharacter, changeSelectedCharacter, saveSelectedCharacter, unselectCharacter, newCharacter } = charactersSlice.actions

export default charactersSlice.reducer