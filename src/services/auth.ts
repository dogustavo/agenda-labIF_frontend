import { fetcher } from 'services'

import type { IAuth } from 'types/auth'

interface IErrorHandler {
  hasError: boolean
  error: unknown
}

export async function authLogin({
  login
}: {
  login: {
    email: string
    password: string
  }
}): Promise<IAuth | IErrorHandler> {
  try {
    const res = await fetcher<IAuth>(`/login`, {
      method: 'POST',
      body: JSON.stringify(login)
    })

    return res
  } catch (err: unknown) {
    return {
      error: err,
      hasError: true
    }
  }
}
