import { fetcher } from 'services'

import type { IScheduleResponse } from 'types/schedule'
import { FetchError } from 'utils/fetcher'

export async function getAllSchedules(): Promise<{
  data?: IScheduleResponse
  error?: FetchError
}> {
  try {
    const res = await fetcher<IScheduleResponse>(`/schedule`, {
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
