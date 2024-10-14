'use client'

import classNames from 'classnames'
import styled from './styles.module.scss'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { resetUserPwd } from 'services'
import { revalidateGeneral } from 'server/reavlidation'
import { ToastStore, useToast } from 'store/notification'
import { useState } from 'react'
import { Button, Modal, Toast } from 'common'

export default function ResetUserPwd({ userId }: { userId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { setShowToast, type } = useToast(
    (state: ToastStore) => state
  )
  const [alertMessage, setAlertMessage] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: resetUserPwd,
    onSuccess: async (ctx) => {
      if (ctx.error) {
        setAlertMessage('Não foi possível resetar senha de usuário')
        setShowToast({
          isOpen: true,
          type: 'error'
        })

        return
      }

      setAlertMessage('Senha do usuário resetada com sucesso')

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
        className={classNames(styled['action-button'])}
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src="/svg/key.svg"
          alt="Icone de chave no centro do botão reset de senha"
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
            Você está prestes a resetar a senha este usuário. Deseja
            continuar?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button isInverted onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() =>
              mutate({
                id: userId
              })
            }
          >
            {isPending ? 'Carregando...' : 'Confirmar'}
          </Button>
        </Modal.Footer>
      </Modal.Root>

      {alertMessage && (
        <Toast.Root>
          <Toast.Header
            title={type === 'error' ? 'Ops!' : 'Sucesso'}
          />
          <Toast.Body>
            <p>{alertMessage}</p>
          </Toast.Body>
        </Toast.Root>
      )}
    </>
  )
}
