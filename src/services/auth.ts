import { fetcher } from 'services'

import type { IAuth, IUserRegisterProps } from 'types/auth'
import { IUserResponse } from 'types/user'
import { FetchError } from 'utils/fetcher'

export async function authLogin({
  login
}: {
  login: {
    username: string
    password: string
  }
}): Promise<{ data?: IAuth; error?: FetchError }> {
  try {
    const res = await fetcher<IAuth>(`/login`, {
      method: 'POST',
      body: JSON.stringify(login)
    })

    return { data: res }
  } catch (error) {
    if (error instanceof FetchError) {
      return { error }
    }

    return {
      error: new FetchError('Unexpected error', 500, new Response())
    }
  }
}

export async function authRegister({
  data
}: {
  data: IUserRegisterProps
}): Promise<{ data?: IUserResponse; error?: FetchError }> {
  try {
    const res = await fetcher<IUserResponse>(`/register`, {
      method: 'POST',
      body: JSON.stringify(data)
    })

    return { data: res }
  } catch (error) {
    if (error instanceof FetchError) {
      return { error }
    }

    return {
      error: new FetchError('Unexpected error', 500, new Response())
    }
  }
}
