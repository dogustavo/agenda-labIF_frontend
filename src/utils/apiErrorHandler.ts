import { FetchError } from './fetcher'

interface ZodError {
  validation: string
  code: string
  message: string
  path: string[]
}

async function handleError(response: Response): Promise<string> {
  const errorMessage = await response
    .json()
    .catch(() => response.text())

  if (Array.isArray(errorMessage.error)) {
    const messages = (errorMessage.error as ZodError[]).map(
      (error) => {
        if (error.message) {
          return error.message
        }
        return 'Erro desconhecido'
      }
    )

    return messages.join(',')
  }

  const message =
    typeof errorMessage === 'object' && errorMessage !== null
      ? errorMessage.message ||
        errorMessage.error ||
        'Erro desconhecido'
      : errorMessage || response.statusText

  return message
}

export async function handleResponse<T>(
  response: Response
): Promise<T> {
  if (!response.ok) {
    const errorMessage = await handleError(response)

    throw new FetchError(
      `Error ${response.status}: ${errorMessage}`,
      response.status,
      response
    )
  }

  return (await response.json().catch(() => ({}))) as T
}
