import { fetcher } from 'services'
import { IUserRegister, IUserRegisterResponse } from 'types/user'

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

export async function getUserById({ id }: { id: string }): Promise<{
  data?: IUserRegisterResponse
  error?: FetchError
}> {
  try {
    const res = await fetcher<IUserRegisterResponse>(`/users/${id}`, {
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

export async function createUser({
  data
}: {
  data: IUserRegister
}): Promise<{
  data?: IUsersResponse
  error?: FetchError
}> {
  try {
    const res = await fetcher<IUsersResponse>(`/users`, {
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

export async function editUser({
  params,
  id
}: {
  params: IUserRegisterResponse
  id: number
}): Promise<{
  data?: IUserRegisterResponse
  error?: FetchError
}> {
  try {
    const res = await fetcher<IUserRegisterResponse>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(params)
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
