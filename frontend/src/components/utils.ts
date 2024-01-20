export const calcModifier = (value: string | number | undefined): number | undefined => {
 let modifier: string = ""
 if (value && !isNaN(Number(value))) {
  return Math.floor((Number(value) - 10) / 2)
 }
 return undefined
}

export const beautifyNumber = (value: number) => {
 if (!isNaN(Number(value))) {
  if (value > 0) {
   return '+' + value
  } else {
   return value.toString()
  }
 }
 
}

export const calculateSkill = (isChecked: boolean, proficiencyBonus: any, skillValue: any) => {
 const skill = calcModifier(skillValue)
 if (!proficiencyBonus) proficiencyBonus = 0
 return beautifyNumber(isChecked ? Number(proficiencyBonus) + skill : skill)
}