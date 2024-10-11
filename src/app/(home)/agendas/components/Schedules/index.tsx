import { Container, ScheduleCard } from 'common'
import type { ISchedule } from 'types/schedule'

import styled from './styles.module.scss'

import Notification from './notification'
import Image from 'next/image'

export default function Schedules({
  schedules
}: {
  schedules?: ISchedule[]
}) {
  if (!schedules?.length) {
    return (
      <Container>
        <div className={styled['empty-schedules']}>
          <Image
            src="/svg/search.svg"
            alt="Icone de lupa no centro do botão de pesquisar"
            width={50}
            height={50}
            className={styled['search-image']}
          />

          <div className={styled['not-found-content']}>
            <h3>Nenhum agendamento encontrado.</h3>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <div className={styled['schedule-section']}>
      <Container>
        <div className={styled['schedules-wrapper']}>
          {schedules.map((schedule) => (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>
      </Container>

      <Notification />
    </div>
  )
}
