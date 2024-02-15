import { differenceInYears } from 'date-fns'

export const formatDate = (dateString: any): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('us-US', options)
}

export const calculateAge = (birthdate: any): number => {
  if (!birthdate) return 0
  const today = new Date()
  const birthDate = new Date(birthdate)
  const age = differenceInYears(today, birthDate)
  return age
}
export const getAgeString = (birthdate: number | ''): string => {
  if (birthdate === '') {
    return ''
  }
  let count = birthdate % 100
  if (count >= 10 && count <= 20) {
    return 'років'
  } else {
    count = birthdate % 10
    if (count === 1) {
      return 'рік'
    } else if (count >= 2 && count <= 4) {
      return 'роки'
    } else {
      return 'років'
    }
  }
}
