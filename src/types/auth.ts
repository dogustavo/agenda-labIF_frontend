export interface IAuth {
  id: number
  name: string
  email: string
  role: 'approver' | 'user' | 'admin'
  token: string
}

export interface IAuthForm {
  username: string
  password: string
}

export interface IUserRegister {
  name: string
  email: string
  password: string
  password_check: string
}

export interface AuthProps extends IAuth {
  isAuth: boolean
}

export interface AuthStore extends AuthProps {
  signIn: (params: AuthProps) => void
  signOut: () => void
}
