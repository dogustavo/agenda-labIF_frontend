'use client'

import { Select, Button, Toast, Input } from 'common'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import styled from './styles.module.scss'
import { useState } from 'react'
import { createEquipament } from 'services'
import { ToastStore, useToast } from 'store/notification'
import { revalidateGeneral } from 'server/reavlidation'
import Link from 'next/link'

import schema from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'

const timesOptions = [
  { label: '01:00', value: '01:00:00' },
  { label: '02:00', value: '02:00:00' },
  { label: '03:00', value: '03:00:00' },
  { label: '04:00', value: '04:00:00' },
  { label: '05:00', value: '05:00:00' },
  { label: '06:00', value: '06:00:00' },
  { label: '07:00', value: '07:00:00' },
  { label: '08:00', value: '08:00:00' },
  { label: '09:00', value: '09:00:00' },
  { label: '10:00', value: '10:00:00' },
  { label: '11:00', value: '11:00:00' },
  { label: '12:00', value: '12:00:00' },
  { label: '13:00', value: '13:00:00' },
  { label: '14:00', value: '14:00:00' },
  { label: '15:00', value: '15:00:00' },
  { label: '16:00', value: '16:00:00' },
  { label: '17:00', value: '17:00:00' },
  { label: '18:00', value: '18:00:00' },
  { label: '19:00', value: '19:00:00' },
  { label: '20:00', value: '20:00:00' },
  { label: '21:00', value: '21:00:00' },
  { label: '22:00', value: '22:00:00' },
  { label: '23:00', value: '23:00:00' }
]

interface IFormValues {
  equipamentName: string
  availableFrom: string
  availableTo: string
}

export default function NewEquipamentForm() {
  const methods = useForm<IFormValues>({
    resolver: zodResolver(schema)
  })
  const { setShowToast, type } = useToast(
    (state: ToastStore) => state
  )

  const [alertMessage, setAlertMessage] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: createEquipament,
    onSuccess: async (ctx) => {
      if (ctx.error) {
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
        path: '/equipamentos',
        redirectTo: `/equipamentos/novo`
      })
    }
  })

  const handleSubmit = methods.handleSubmit(async (values) => {
    await mutate(values)
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
              <Select name="availableFrom" options={timesOptions} />
              <Select name="availableTo" options={timesOptions} />
            </div>
          </div>

          <div className={styled['button-wrapper']}>
            <Button isInverted asChild>
              <Link href="/equipamentos">Cancelar</Link>
            </Button>
            <Button onClick={handleSubmit} type="submit">
              {isPending ? 'Enviando...' : 'Enviar'}
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
