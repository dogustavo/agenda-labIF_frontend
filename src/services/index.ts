import { cookies } from 'next/headers'

export * from './auth'

import { FetchError } from 'utils/fetcher'

export async function fetcher<T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const token = cookies().get('user-auth')?.value

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${input}`,
    {
      ...init,
      headers: {
        ...init?.headers,
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearear ${token}` })
      }
    }
  )

  if (!response.ok) {
    const errorMessage = await response.text()

    throw new FetchError(
      `Error ${response.status}: ${
        errorMessage || response.statusText
      }`,
      response.status,
      response
    )
  }

  return (await response.json()) as T
}
