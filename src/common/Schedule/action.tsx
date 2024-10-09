'use client'

import styled from './styles.module.scss'
import Allow from 'provider/usersPermission'
import { USER_ROLES } from 'enums/Roles.enums'
import classNames from 'classnames'
import { evaluateSchedule } from 'services/schedules'
import { useRouter } from 'next/navigation'

interface IActionProp {
  scheduleId: number
}

export default function ScheduleAction({ scheduleId }: IActionProp) {
  const router = useRouter()

  const handleScheduleAction = async (action: string) => {
    const res = await evaluateSchedule({
      id: scheduleId,
      action
    })

    if (!res.success) {
      console.log('deu ruim error')
      return
    }

    console.log('res', res)
    router.refresh()
  }

  return (
    <Allow roles={[USER_ROLES.USER_APPROVER, USER_ROLES.USER_ADMIN]}>
      <div className={styled['schedule-actions']}>
        <button
          type="button"
          onClick={() => handleScheduleAction('approved')}
          className={classNames(
            styled.action,
            styled['action-accept']
          )}
        >
          Agendar
        </button>
        <button
          type="button"
          onClick={() => handleScheduleAction('repproved')}
          className={classNames(styled.action, styled['action-deny'])}
        >
          Recusar
        </button>
      </div>
    </Allow>
  )
}
