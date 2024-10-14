export interface IUserType {
  id: number
  description: string
  is_intern: boolean
  createdAt: Date
}

export interface IUserRegisterResponse {
  name: string
  email: string
  role: 'user' | 'approver' | 'admin'
  userType: string
  id: number
}

export interface IUserRegister extends IUserRegisterResponse {
  password: string
}

export interface IUserResponse {
  id: number
  name: string
  email: string
  role: 'user' | 'approver' | 'admin'
  userType: string
  isBlocked?: boolean
  isReseted?: boolean
  token: string
}

export interface IUserTypeResponse {
  data: IUserType[]
  meta: IMeta
}

export interface IUsersResponse {
  data: IUserResponse[]
  meta: IMeta
}

interface IMeta {
  totalRecords: number
  totalPages: number
  currentPage: number
  pageSize: number
}
