import { Container, ScheduleCard } from 'common'
import type { ISchedule } from 'types/schedule'

import styled from './styles.module.scss'

export default function Schedules({
  schedules
}: {
  schedules: ISchedule[]
}) {
  return (
    <section className={styled['schedule-section']}>
      <Container>
        <div className={styled['schedules-wrapper']}>
          {schedules.map((schedule) => (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>
      </Container>
    </section>
  )
}
