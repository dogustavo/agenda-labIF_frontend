import { fetcher } from 'services'

import type {
  ICreatEquipament,
  IEquipaments,
  IEquipamentsResponse
} from 'types/equipaments'
import { FetchError } from 'utils/fetcher'
import { formatQueryString } from 'utils/queryString'

export interface IEquipamentsProp {
  filter?: any
}

interface IDisponibilityProp {
  selectedDay: string
  equipamentId: string
}

export async function getAllEquipaments({
  filter
}: IEquipamentsProp): Promise<{
  data?: IEquipamentsResponse
  error?: FetchError
}> {
  try {
    const strFilter = formatQueryString(filter)

    const res = await fetcher<IEquipamentsResponse>(
      `/equipaments?${strFilter}`,
      {
        method: 'GET'
      }
    )

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

export async function getEquipament(id: string): Promise<{
  data?: IEquipaments
  error?: FetchError
}> {
  try {
    const res = await fetcher<IEquipaments>(`/equipaments/${id}`, {
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

export async function getEquipamentDisponibility({
  equipamentId,
  selectedDay
}: IDisponibilityProp): Promise<{
  data?: { availableTimes: string[] }
  error?: FetchError
}> {
  const strFilter = formatQueryString({ selectedDay })
  try {
    const res = await fetcher<{ availableTimes: string[] }>(
      `/equipaments/availability/${equipamentId}?${strFilter}`,
      {
        method: 'GET'
      }
    )

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

export async function createEquipament(
  params: ICreatEquipament
): Promise<{
  data?: IEquipaments
  error?: FetchError
}> {
  try {
    const res = await fetcher<IEquipaments>('/equipaments', {
      method: 'POST',
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

export async function editEquipament({
  params,
  id
}: {
  params: ICreatEquipament
  id: number
}): Promise<{
  data?: IEquipaments
  error?: FetchError
}> {
  try {
    const res = await fetcher<IEquipaments>(`/equipaments/${id}`, {
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
