import { fetcher } from 'services'
import {
  IUserRegister,
  IUserRegisterResponse,
  IUserResponse
} from 'types/user'

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

export async function blockUser({
  action,
  id
}: {
  action: string
  id: number
}): Promise<{
  success?: boolean
  error?: FetchError
}> {
  try {
    await fetcher(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        action
      })
    })

    return { success: true }
  } catch (error) {
    if (error instanceof FetchError) {
      return { error }
    }

    return {
      error: new FetchError('Unexpected error', 500, new Response())
    }
  }
}

export async function resetUserPwd({ id }: { id: number }): Promise<{
  success?: boolean
  error?: FetchError
}> {
  try {
    await fetcher(`/users/pwd-reset/${id}`, {
      method: 'PATCH'
    })

    return { success: true }
  } catch (error) {
    if (error instanceof FetchError) {
      return { error }
    }

    return {
      error: new FetchError('Unexpected error', 500, new Response())
    }
  }
}

export async function changeUserPwd({
  id,
  password
}: {
  id: number
  password: string
}): Promise<{
  data?: IUserResponse
  error?: FetchError
}> {
  try {
    const res = await fetcher<IUserResponse>(`/users/new-pwd/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ password })
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
