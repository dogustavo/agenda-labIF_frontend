import type { ISchedule } from 'types/schedule'
import styled from './styles.module.scss'
import { format, parseISO } from 'date-fns'
import ScheduleAction from './action'

const statusColors: Record<string, string> = {
  approved: '#629B51',
  repproved: '#DC3545',
  pending: '#6C757D'
}

const statusName: Record<string, string> = {
  approved: 'Aprovado',
  repproved: 'Reprovado',
  pending: 'Pendente'
}

const formatHour = (hour: string) => {
  if (!hour) {
    return ''
  }
  return `${String(hour.split(':')[0]).padStart(2, '0')}:00`
}

const formatDate = (date: string) => {
  if (!date) {
    return ''
  }

  const parseDate = parseISO(date)
  return format(parseDate, 'dd/MM/yyyy')
}

export default function ScheduleCard({
  schedule
}: {
  schedule: ISchedule
}) {
  return (
    <div className={styled['schedule-card']}>
      <span
        style={
          {
            '--badge-color': statusColors[schedule.status]
          } as React.CSSProperties
        }
        className={styled['schedule-status']}
      >
        {statusName[schedule.status]}
      </span>

      <div className={styled['schedule-header']}>
        <h3>{schedule.scheduledBy}</h3>
        <p>{schedule.equipamentName}</p>
      </div>

      <div className={styled['schedule-info']}>
        <div className={styled['schedule-info-item']}>
          <span>Data</span>
          <p>{formatDate(schedule.scheduleDate)}</p>
        </div>
        <div className={styled['schedule-info-item']}>
          <span>Hora</span>
          <p>
            {formatHour(schedule.timeInit)} -{' '}
            {formatHour(schedule.timeEnd)}
          </p>
        </div>
      </div>

      {schedule.status === 'pending' && (
        <ScheduleAction scheduleId={schedule.id} />
      )}
    </div>
  )
}
