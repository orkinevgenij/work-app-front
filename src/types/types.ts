export interface IUser {
  email: string
  name: string
  lastname: string
  phone: string
  role: string
  id: number
  accessToken: string
  refreshToken: string
}
export type UserArgs = Omit<IUser, 'id' | 'accessToken' | 'refreshToken'> & {
  password: string
}
export type Profile = Pick<
  IUser,
  'id' | 'name' | 'lastname' | 'email' | 'phone' | 'role'
>

export interface ICompany {
  id: number
  title: string
  description: string
  user: IUser
  createdAt: string
  updatedAt: string
}

export type CompanyArgs = Pick<ICompany, 'title' | 'description'>

export interface ICategory {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}
export interface ICity {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}
export type Meta = {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  totalPages: number
  sortBy: [string, 'ASC' | 'DESC'][]
}

export type ILinks = {
  current: string
  next: string
  last: string
}

export type Vacancy = {
  id: number
  title: string
  description: string
  salary: number
  views: number
  createdAt: string
  updatedAt: string
  company: ICompany
  category: ICategory
  city: ICity
}
export interface IVacancy {
  data: Vacancy[]
  meta: Meta
  links: ILinks
}

export type IVacancyArgs = {
  title: string
  description: string
  category: number
  city: number
  salary: number
  company?: number
}
export interface IResume {
  name: string
  lastname: string
  position: string
  city: string
  phone: string
  email: string
  profile: string
  salary: number
  id: number
  user: IUser
  createdAt: string
  updatedAt: string
}

export type ResumeArgs = Pick<
  IResume,
  | 'name'
  | 'lastname'
  | 'position'
  | 'city'
  | 'phone'
  | 'email'
  | 'profile'
  | 'salary'
>
export interface Response {
  id: number
  status: string
  createdAt: string
  updatedAt: string
  resume: IResume
  vacancy: Vacancy
  company: ICompany
  user: IUser
  coverLetter: string
}
export interface IResponse {
  data: Response[]
  meta: Meta
  links: ILinks
}
export interface ICity {
  id: number
  name: string
}
