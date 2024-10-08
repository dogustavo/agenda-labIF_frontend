import { create } from 'zustand'

import { persist } from 'zustand/middleware'

import { AuthProps, AuthStore } from 'types/auth'

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      token: '',
      name: '',
      email: '',
      id: 0,
      isAuth: false,
      role: 'user',
      signIn: (auth: AuthProps) =>
        set(() => {
          return auth
        }),
      signOut: () =>
        set(() => {
          return {
            isAuth: false,
            token: '',
            username: '',
            email: '',
            permissions: []
          }
        })
    }),
    {
      name: 'auth-storage'
    }
  )
)
