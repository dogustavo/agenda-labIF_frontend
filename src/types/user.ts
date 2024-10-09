export interface IUserType {
  id: number
  description: string
  is_intern: boolean
  createdAt: Date
}

export interface IUserRegister {
  name: string
  email: string
  password: string
  role: 'user' | 'approver' | 'admin'
  userType: string
}

export interface IUserResponse {
  id: number
  name: string
  email: string
  password: string
  role: 'user' | 'approver' | 'admin'
  userType: string
  token: string
}

export interface IUserTypeResponse {
  data: IUserType[]
  meta: IMeta
}

interface IMeta {
  totalRecords: number
  totalPages: number
  currentPage: number
  pageSize: number
}
