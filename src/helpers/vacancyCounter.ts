import { Vacancy } from '../types/types'

export const countByCategory = (
  vacancies: Vacancy[],
  id: number,
): number | null => {
  const count = vacancies?.filter(vacancy => vacancy.category.id === id)
  if (count) {
    return count.length
  } else {
    return null
  }
}

export const countByCity = (
  vacancies: Vacancy[],
  id: number,
): number | null => {
  const count = vacancies?.filter(vacancy => vacancy.city?.id === id)
  if (count) {
    return count.length
  } else {
    return null
  }
}
export const countByCompany = (
  vacancies: Vacancy[],
  id: number,
): number | null => {
  const count = vacancies?.filter(vacancy => vacancy.company?.id === id)
  if (count) {
    return count.length
  } else {
    return null
  }
}
