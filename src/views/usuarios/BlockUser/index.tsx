'use client'

import classNames from 'classnames'
import styled from './styles.module.scss'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { blockUser } from 'services'
import { revalidateGeneral } from 'server/reavlidation'
import { ToastStore, useToast } from 'store/notification'
import { useState } from 'react'
import { Button, Modal } from 'common'

export default function BlockUser({
  isBlocked = false,
  userId
}: {
  userId: number
  isBlocked?: boolean
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { setShowToast } = useToast((state: ToastStore) => state)

  const { mutate, isPending } = useMutation({
    mutationFn: blockUser,
    onSuccess: async (ctx) => {
      if (ctx.error) {
        setShowToast({
          isOpen: true,
          type: 'error'
        })

        return
      }

      setShowToast({
        isOpen: true,
        type: 'success'
      })
      setIsModalOpen(false)
      await revalidateGeneral({
        path: '/usuarios',
        redirectTo: `/usuarios`
      })
    }
  })

  return (
    <>
      <button
        className={classNames(styled['action-button'], {
          [styled['is-blocked']]: !isBlocked
        })}
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={!isBlocked ? '/svg/lock.svg' : '/svg/lock_open.svg'}
          alt="Icone de cadeado no centro do botão editar usero"
          width={22}
          height={22}
        />
      </button>

      <Modal.Root isOpen={isModalOpen}>
        <Modal.Header
          title={'Antenção!'}
          closeModal={() => setIsModalOpen(false)}
        />
        <Modal.Body>
          <p>
            Você está prestes a
            {isBlocked ? ' desbloquear ' : ' bloquear '}
            este usuário. Deseja continuar?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button isInverted onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() =>
              mutate({
                action: isBlocked ? 'unblock' : 'block',
                id: userId
              })
            }
          >
            {isPending ? 'Carregando...' : 'Confirmar'}
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </>
  )
}
