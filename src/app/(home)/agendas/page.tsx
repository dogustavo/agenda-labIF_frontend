import { getAllSchedules } from 'services/schedules'
import styled from './styles.module.scss'
import { redirect } from 'next/navigation'

export default async function Agenda() {
  const schedules = await getAllSchedules()

  if (schedules.error?.statusCode === 401) {
    return redirect('/login')
  }
  console.log('schedules:::', schedules)

  return <div className={styled['main-page']}></div>
}
