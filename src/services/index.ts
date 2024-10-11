import { getCookie } from 'server/cookieAction'

export * from './auth'
export * from './user'
export * from './equipaments'

import { handleResponse } from 'utils/apiErrorHandler'

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

  return handleResponse(response)
}
