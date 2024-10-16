'use client'

import { Select, Button, Toast, Input } from 'common'
import { FormProvider, useForm } from 'react-hook-form'

import styled from './styles.module.scss'
import { useEffect, useState } from 'react'
import { editEquipament } from 'services'
import { ToastStore, useToast } from 'store/notification'
import { revalidateGeneral } from 'server/reavlidation'
import Link from 'next/link'
import { ICreatEquipament, IEquipaments } from 'types/equipaments'

import schema from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

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

export default function EditEquipamentForm({
  equipament
}: {
  equipament?: IEquipaments
}) {
  const methods = useForm<ICreatEquipament>({
    resolver: zodResolver(schema)
  })
  const { setShowToast, type } = useToast(
    (state: ToastStore) => state
  )

  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    if (equipament?.equipamentName) {
      methods.setValue('equipamentName', equipament.equipamentName)
    }
    if (equipament?.availableFrom) {
      methods.setValue('availableFrom', equipament.availableFrom)
    }
    if (equipament?.availableTo) {
      methods.setValue('availableTo', equipament.availableTo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { mutate, isPending } = useMutation({
    mutationFn: editEquipament,
    onSuccess: async (ctx) => {
      if (ctx.error) {
        setAlertMessage('Não foi possível editar equipamento')
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
      await revalidateGeneral({
        path: '/equipamentos',
        redirectTo: `/equipamentos/${equipament?.id}`
      })
    }
  })

  const handleSubmit = methods.handleSubmit(async (values) => {
    const request = {
      id: equipament?.id as number,
      params: {
        ...values
      }
    }

    await mutate(request)
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
              <Select
                name="availableFrom"
                defaultValue={equipament?.availableFrom}
                options={timesOptions}
              />
              <Select
                name="availableTo"
                defaultValue={equipament?.availableTo}
                options={timesOptions}
              />
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
