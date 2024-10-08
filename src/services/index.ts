import { getCookie } from 'server/cookieAction'

export * from './auth'

import { FetchError } from 'utils/fetcher'

export async function fetcher<T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const token = await getCookie('user-auth')

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
    const errorMessage = await response
      .json()
      .catch(() => response.text())

    const message =
      typeof errorMessage === 'object' && errorMessage !== null
        ? errorMessage.message ||
          errorMessage.error ||
          'Erro desconhecido'
        : errorMessage || response.statusText

    throw new FetchError(
      `Error ${response.status}: ${message}`,
      response.status,
      response
    )
  }

  return (await response.json()) as T
}
