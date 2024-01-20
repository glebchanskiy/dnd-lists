import { backgrounds, races, classes, factions } from './data2';
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import DnDCharacter from '@models/DnDCharacter'
import { chars } from './data'
import { DnDRace } from '@/models/DnDRace'
import { DnDClass } from '@/models/DnDClass'
import { DnDFaction } from '@/models/DnDFaction'
import { DnDBackground } from '@/models/DnDBackground';
import Cookies from 'universal-cookie';
import axios, { AxiosHeaders } from 'axios';
import { DnDCharacterDTO } from '@/models/DnDCharacterDTO';
import { RootState } from './store';
import { logout } from './userSlice';

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

const gleb = { username: 'glebchasnkiy' } as User

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

export const dtoToObject = (char: DnDCharacterDTO): DnDCharacter => {

  const dto: DnDCharacter = {}
  for (const v of Object.entries(char)) {

    if (v[0] === 'dndClass') {
      dto.class = (v[1] as any ).name
    } else if (v[0] === 'background') {
      dto.background = (v[1] as any ).name
    } else if (v[0] === 'faction') {
      dto.faction = (v[1] as any ).name
    } else if (v[0] === 'race') {
      dto.race = (v[1] as any ).name
    } else if (v[0] === 'attacks') {
      dto.attacks = JSON.parse(v[1] as string)
    } else if (v[0] === 'lvl1Spells') {
      dto.lvl1Spells = JSON.parse(v[1] as string)
    } else if (v[0] === 'lvl2Spells') {
      dto.lvl2Spells = JSON.parse(v[1] as string)
    } else if (v[0] === 'lvl3Spells') {
      dto.lvl3Spells = JSON.parse(v[1] as string)
    } else if (v[0] === 'lvl4Spells') {
      dto.lvl4Spells = JSON.parse(v[1] as string)
    } else if (v[0] === 'lvl5Spells') {
      dto.lvl5Spells = JSON.parse(v[1] as string)
    } else if (v[0] === 'lvl6Spells') {
      dto.lvl6Spells = JSON.parse(v[1] as string)
    } else if (v[0] === 'lvl7Spells') {
      dto.lvl7Spells = JSON.parse(v[1] as string)
    } else if (v[0] === 'lvl8Spells') {
      dto.lvl8Spells = JSON.parse(v[1] as string)
    } else if (v[0] === 'lvl9Spells') {
      dto.lvl9Spells = JSON.parse(v[1] as string)
    } else if (v[0] === 'id') {
      dto.id = `${v[1]}`
    }
    else if (v[0] === 'playerNameId' ) {} 
    else 
      dto[v[0]] = v[1]
  }

  console.log('dto: ', dto)
  return dto
} 

export const loadAllCharacters = createAsyncThunk("slicer/loadAllCharacters", async () => {
  const token = new Cookies().get('jwt');

  let headers: AxiosHeaders = new AxiosHeaders();
  if (token) headers.setAuthorization(`Bearer ${token}`);

  console.log("token: ", token);
  return axios
    .get(
      `http://192.168.185.121:8080/api/v1/characters`,
      { headers }
    )
    .then((data) => data.data.map((d) => dtoToObject(d)))
})


// {
//   "id": "897824bf-d710-44ad-b31c-58eee6633248",
//   "class": "Волшебник",
//   "classLevel": "9",
//   "background": "Беспризорник",
//   "playerName": "hehe",
//   "faction": "Lord's Alliance",
//   "race": "Эльф",
//   "alignment": "LawfulEvil"
// }



export const mapToDTO = (char: DnDCharacter): DnDCharacterDTO => {
  const dto: DnDCharacterDTO = {}
  for (const v of Object.entries(char)) {

    if (v[0] === 'class') {
      dto.dndClass = v[1]
    } else if (v[0] === 'attacks') {
      dto.attacks = JSON.stringify(v[1])
    } else if (v[0] === 'lvl1Spells') {
      dto.lvl1Spells = JSON.stringify(v[1])
    } else if (v[0] === 'lvl2Spells') {
      dto.lvl2Spells = JSON.stringify(v[1])
    } else if (v[0] === 'lvl3Spells') {
      dto.lvl3Spells = JSON.stringify(v[1])
    } else if (v[0] === 'lvl4Spells') {
      dto.lvl4Spells = JSON.stringify(v[1])
    } else if (v[0] === 'lvl5Spells') {
      dto.lvl5Spells = JSON.stringify(v[1])
    } else if (v[0] === 'lvl6Spells') {
      dto.lvl6Spells = JSON.stringify(v[1])
    } else if (v[0] === 'lvl7Spells') {
      dto.lvl7Spells = JSON.stringify(v[1])
    } else if (v[0] === 'lvl8Spells') {
      dto.lvl8Spells = JSON.stringify(v[1])
    } else if (v[0] === 'lvl9Spells') {
      dto.lvl9Spells = JSON.stringify(v[1])
    } else if (v[0] === 'playerNameId' ) {} 
    // else if (v[0] === 'name') {
    //   dto.name = v[1] as 
    // }
    // else if (v[0] === 'id') {
    //   dto.id = undefined// сча я понял
    // }
    else 
      dto[v[0]] = v[1]
  }

  console.log('dto: ', dto)
  return dto
} 

// mapToDTO({id: '1', class: 'Волшебник', classLevel: '8', background: 'Беспризорник', playerNameId: 'glebash', faction: 'Lord\'s Alliance' })



export const postCharacter = createAsyncThunk("slicer/postCharacter", async (arg, {getState}) => {
  const token = new Cookies().get('jwt');
  const state = getState() as RootState
  const currentChar = state.charactersSlice.currentCharacter

  console.log('token: ', token)
  console.log('current: ', current)
  console.log('playerNameId: ', state.userSlice.auth.username)

  if (token && currentChar) {
    let headers: AxiosHeaders = new AxiosHeaders();
    headers.setAuthorization(`Bearer ${token}`); // )-:


    const body = mapToDTO(currentChar)
    // body.dndClass =

    return axios
      .post(
        `http://192.168.185.121:8080/api/v1/characters`,
        body,
        { headers }
      )
      .then((data) => data.data);
  } else {
    alert('There is no need to save an empty sheet.\nWrite down at least the name and class of the character.')
  }
})

export const updateCharacterThunk = createAsyncThunk("slicer/postCharacter", async (arg, {getState}) => {

  const token = new Cookies().get('jwt');
  const state = getState() as RootState
  const currentChar = state.charactersSlice.currentCharacter

  if (token && currentChar) {
    let headers: AxiosHeaders = new AxiosHeaders();
    headers.setAuthorization(`Bearer ${token}`); // )-:

    const body = mapToDTO(currentChar)

    console.log('body: ', body)
  
    return axios
      .post(
        `http://192.168.185.121:8080/api/v1/characters/` + body.id,
        body,
        { headers }
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