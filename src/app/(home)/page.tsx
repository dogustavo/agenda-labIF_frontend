import { getAllSchedules } from 'services/schedules'
import styled from './styles.module.scss'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const schedules = await getAllSchedules()

  if (schedules.error?.statusCode === 401) {
    return redirect('/login')
  }
  if (schedules.error?.statusCode === 403) {
    return cookies().delete('user-auth')
  }

  console.log('schedules', schedules)

  return <main className={styled['main-page']}></main>
}
