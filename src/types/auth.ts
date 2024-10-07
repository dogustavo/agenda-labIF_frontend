export interface IAuth {
  id: number
  name: string
  email: string
  role: 'approver' | 'user' | 'admin'
  token: string
}

export interface IUserRegister {
  name: string
  email: string
  password: string
  password_check: string
}
