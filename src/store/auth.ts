import { create } from 'zustand'

import { persist } from 'zustand/middleware'

import { AuthProps, AuthStore, IAuth } from 'types/auth'

interface AuthState extends IAuth {
  isAuth: boolean
}

const initialState: AuthState = {
  token: '',
  name: '',
  email: '',
  id: 0,
  isAuth: false,
  role: 'user',
  isBlocked: false,
  isReseted: false
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      signIn: (auth: AuthProps) =>
        set(() => {
          return auth
        }),
      signOut: () => set(() => initialState)
    }),
    {
      name: 'auth-storage'
    }
  )
)
