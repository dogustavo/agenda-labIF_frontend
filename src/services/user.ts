import { fetcher } from 'services'

import { IUserTypeResponse } from 'types/user'
import { FetchError } from 'utils/fetcher'

export async function getUsersTypes(): Promise<{
  data?: IUserTypeResponse
  error?: FetchError
}> {
  try {
    const res = await fetcher<IUserTypeResponse>(`/user-type`, {
      method: 'GET'
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
