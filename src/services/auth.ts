import { fetcher } from 'services'

import type { IAuth } from 'types/auth'
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
