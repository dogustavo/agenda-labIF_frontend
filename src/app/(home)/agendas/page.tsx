import { getAllSchedules } from 'services/schedules'
import styled from './styles.module.scss'
import { redirect } from 'next/navigation'

import { Schedules } from './components'

export default async function Agenda() {
  const { error, data: schedules } = await getAllSchedules()

  if (error?.statusCode === 401) {
    return redirect('/login')
  }

  if (!schedules?.data) {
    return <p>Não foi encontrado nenhuum agendamento</p>
  }

  return (
    <div className={styled['main-page']}>
      <Schedules schedules={schedules.data} />
    </div>
  )
}
