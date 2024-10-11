'use client'

import styled from './styles.module.scss'
import Allow from 'provider/usersPermission'
import { USER_ROLES } from 'enums/Roles.enums'
import classNames from 'classnames'
import { evaluateSchedule } from 'services/schedules'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Modal, Button } from 'common'
import { ToastStore, useToast } from 'store/notification'

interface IActionProp {
  scheduleId: number
}

export default function ScheduleAction({ scheduleId }: IActionProp) {
  const router = useRouter()
  const { setShowToast } = useToast((state: ToastStore) => state)

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [buttonAction, setButtonAction] = useState('')

  const handleModalOpen = (action: string) => {
    setIsModalOpen(true)
    setButtonAction(action)
  }

  const handleScheduleAction = async () => {
    setIsLoading(true)

    const res = await evaluateSchedule({
      id: scheduleId,
      action: buttonAction
    })

    setIsLoading(false)

    if (!res.success) {
      setShowToast({
        isOpen: true,
        path: '/agendas',
        type: 'error'
      })
      setIsModalOpen(false)
      setButtonAction('')
      return
    }

    setIsModalOpen(false)
    setButtonAction('')
    setShowToast({
      isOpen: true,
      path: '/agendas',
      type: 'success'
    })
    router.refresh()
  }

  return (
    <>
      <Allow
        roles={[USER_ROLES.USER_APPROVER, USER_ROLES.USER_ADMIN]}
      >
        <div className={styled['schedule-actions']}>
          <button
            type="button"
            onClick={() => handleModalOpen('approved')}
            className={classNames(
              styled.action,
              styled['action-accept']
            )}
          >
            Agendar
          </button>
          <button
            type="button"
            onClick={() => handleModalOpen('repproved')}
            className={classNames(
              styled.action,
              styled['action-deny']
            )}
          >
            Recusar
          </button>
        </div>
      </Allow>

      <Modal.Root isOpen={isModalOpen}>
        <Modal.Header
          title={'Antenção!'}
          closeModal={() => setIsModalOpen(false)}
        />
        <Modal.Body>
          <p>
            Você está prestes a{' '}
            {
              { approved: 'aprovar', repproved: 'reprovar' }[
                buttonAction
              ]
            }{' '}
            este agendamento. Deseja continuar?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button isInverted onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleScheduleAction}>
            {isLoading ? 'Carregando...' : 'Confirmar'}
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </>
  )
}
