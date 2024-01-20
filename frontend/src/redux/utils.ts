import DnDCharacter from "@/models/DnDCharacter";
import { DnDCharacterDTO } from "@/models/DnDCharacterDTO";
import { AxiosHeaders } from "axios";
import Cookies from "universal-cookie";


export const tokenExist = (): boolean => {
 return !!(new Cookies().get('jwt'))
}
export const createAxiosHeadersWithToken = (): AxiosHeaders => {
 const token = new Cookies().get('jwt');

 const headers: AxiosHeaders = new AxiosHeaders();
 if (token) headers.setAuthorization(`Bearer ${token}`);

 return headers
}

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
  } else if (v[0] === 'playerNameId') { }
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

export const dtoToObject = (char: DnDCharacterDTO): DnDCharacter => {

 const dto: DnDCharacter = {}
 for (const v of Object.entries(char)) {

  if (v[0] === 'dndClass') {
   dto.class = (v[1] as any).name
  } else if (v[0] === 'background') {
   dto.background = (v[1] as any).name
  } else if (v[0] === 'faction') {
   dto.faction = (v[1] as any).name
  } else if (v[0] === 'race') {
   dto.race = (v[1] as any).name
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
  else if (v[0] === 'playerNameId') { }
  else
   dto[v[0]] = v[1]
 }

 console.log('dto: ', dto)
 return dto
}