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

export async function evaluateSchedule({
  id,
  action
}: {
  id: number
  action: string
}): Promise<{
  success: boolean
}> {
  try {
    await fetcher(`/schedule/evaluate/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ action })
    })

    return { success: true }
  } catch (error) {
    if (error instanceof FetchError) {
      return { success: false }
    }

    return { success: true }
  }
}
