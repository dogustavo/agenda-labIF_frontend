import { fetcher } from 'services'

import { IUsersResponse, IUserTypeResponse } from 'types/user'
import { FetchError } from 'utils/fetcher'
import { formatQueryString } from 'utils/queryString'

export interface IUserProp {
  filter?: any
}

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

export async function getAllUsers({ filter }: IUserProp): Promise<{
  data?: IUsersResponse
  error?: FetchError
}> {
  try {
    const strFilter = formatQueryString(filter)

    const res = await fetcher<IUsersResponse>(`/users?${strFilter}`, {
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
