'use client'

import { Button, Toast, Input } from 'common'
import { FormProvider, useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
import styled from './styles.module.scss'
import { useState } from 'react'
import { createEquipament } from 'services'
import { ToastStore, useToast } from 'store/notification'
import { revalidateGeneral } from 'server/reavlidation'
import Link from 'next/link'

interface IFormValues {
  equipamentName: string
  availableFrom: string
  availableTo: string
}

export default function EditUserForm() {
  const methods = useForm<IFormValues>({})
  const { setShowToast, type } = useToast(
    (state: ToastStore) => state
  )

  const [isLoading, setIsLoading] = useState(false)

  const [alertMessage, setAlertMessage] = useState('')

  const handleSubmit = methods.handleSubmit(async (values) => {
    setIsLoading(true)

    const { error, data } = await createEquipament(values)

    setIsLoading(false)

    if (!!error) {
      setAlertMessage(error.message)
      setShowToast({
        isOpen: true,
        type: 'error'
      })
      return
    }
    if (!data) {
      setAlertMessage('Não foi possível criar novo equipamento')
      setShowToast({
        isOpen: true,
        type: 'error'
      })
      return
    }

    setAlertMessage('Equipamento criado com sucesso')
    setShowToast({
      isOpen: true,
      type: 'success'
    })

    methods.reset()
    await revalidateGeneral({
      path: '/usuarios',
      redirectTo: `/usuarios/novo`
    })
  })

  return (
    <div className={styled['schedule-form-container']}>
      <FormProvider {...methods}>
        <form className={styled['form-wrapper']}>
          <div className={styled['schedule-form']}>
            <div className={styled['inputs-wrapper']}>
              <Input
                label="Nome"
                name="equipamentName"
                placeholder="Nome"
                type="text"
              />
              {/* <Select name="availableFrom" options={timesOptions} />
              <Select name="availableTo" options={timesOptions} /> */}
            </div>
          </div>

          <div className={styled['button-wrapper']}>
            <Button isInverted asChild>
              <Link href="/usuarios">Cancelar</Link>
            </Button>
            <Button onClick={handleSubmit} type="submit">
              {isLoading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </FormProvider>

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
    </div>
  )
}
