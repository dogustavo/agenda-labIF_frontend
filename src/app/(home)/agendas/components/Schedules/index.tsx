import { Container, ScheduleCard } from 'common'
import type { ISchedule } from 'types/schedule'

import styled from './styles.module.scss'

import Notification from './notification'

export default function Schedules({
  schedules
}: {
  schedules: ISchedule[]
}) {
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
