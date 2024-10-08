// next-auth.d.ts
import NextAuth from 'next-auth'
import { IAuth } from 'services' // Importe seu tipo de IAuth

declare module 'next-auth/providers' {
  interface CredentialsConfig {
    authorize?: (
      credentials: Record<'username' | 'password', string> | undefined
    ) => Promise<IAuth | null>
  }
}
