'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'

import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Select, DatePicker, Button, Toast, PillCheck } from 'common'

import { revalidateGeneral } from 'server/reavlidation'
import { ToastStore, useToast } from 'store/notification'
import { addOneHour, areTimesConsecutive } from 'utils/time'

import { getEquipamentDisponibility, createSchedule } from 'services'

import styled from './styles.module.scss'

import schema from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

interface IFormProp {
  equipamentsOptions: IEquipaments[] | []
}

interface IEquipaments {
  label: string
  value: number
}

interface IFormValues {
  equipamentId: string
  scheduleDate: Date
  time: string[]
}

export default function NewScheduleForm({
  equipamentsOptions
}: IFormProp) {
  const methods = useForm<IFormValues>({
    resolver: zodResolver(schema)
  })
  const { setShowToast, type } = useToast(
    (state: ToastStore) => state
  )

  const [alertMessage, setAlertMessage] = useState('')

  const scheduleDate = methods.watch('scheduleDate')
  const equipamentId = methods.watch('equipamentId')

  const {
    mutate,
    isPending: diponibilityLoding,
    data: disponibilityData,
    reset
  } = useMutation({
    mutationFn: getEquipamentDisponibility,
    onSuccess: async (ctx) => {
      const { error, data } = ctx

      if (error) {
        setAlertMessage(error.message)
        setShowToast({
          isOpen: true,
          type: 'error'
        })
        return
      }
      if (!data?.availableTimes.length) {
        setAlertMessage('Não foi possível encontra disponibilidade')
        setShowToast({
          isOpen: true,
          type: 'error'
        })
        return
      }
    }
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSchedule,
    onSuccess: async (ctx) => {
      if (ctx.error) {
        setAlertMessage('Não foi possível criar um agendamento!')
        setShowToast({
          isOpen: true,
          type: 'error'
        })

        return
      }

      setAlertMessage('Agendamento realizado com sucesso')
      setShowToast({
        isOpen: true,
        type: 'success'
      })
      methods.reset()
      reset()
      await revalidateGeneral({
        path: '/agendas',
        redirectTo: '/agendas/novo'
      })
    }
  })

  useEffect(() => {
    reset()
  }, [reset, scheduleDate, equipamentId])

  const handleSubmit = methods.handleSubmit(async (values) => {
    if (!areTimesConsecutive(values.time)) {
      setShowToast({
        isOpen: true,
        type: 'error'
      })
      setAlertMessage(
        'Os horários selecionados devem ser consecutivos.'
      )
      return false
    }

    const schedule = {
      equipamentId: +values.equipamentId,
      scheduleDate: format(values.scheduleDate, 'yyyy-MM-dd'),
      timeInit: values.time[0],
      timeEnd: addOneHour(values.time[values.time.length - 1])
    }

    await mutateAsync(schedule)
  })

  const handleEquipamentDisponibility = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    const date = methods.getValues('scheduleDate')
    const equipament = methods.getValues('equipamentId')

    if (!equipament || !date) {
      methods.setError(
        !equipament ? 'equipamentId' : 'scheduleDate',
        {
          message: !equipament
            ? 'Selecione o equipamento para buscar horários.'
            : 'Selecione a data para fazer a consulta'
        }
      )
      return
    }

    // setDispLoading(true)

    const values = {
      selectedDay: format(date, 'yyyy-MM-dd'),
      equipamentId: equipament
    }

    await mutate(values)
  }

  return (
    <div className={styled['schedule-form-container']}>
      <FormProvider {...methods}>
        <form className={styled['form-wrapper']}>
          <div className={styled['schedule-form']}>
            <div className={styled['inputs-wrapper']}>
              <Select
                name="equipamentId"
                options={equipamentsOptions}
              />

              <DatePicker
                name="scheduleDate"
                label="Data da agenda"
                placeholder="Buscar data de agendamento"
              />

              <div>
                <Button
                  isInverted
                  onClick={handleEquipamentDisponibility}
                >
                  {diponibilityLoding
                    ? 'Carregando...'
                    : ' Buscar Horários Disponíveis'}
                </Button>
              </div>
            </div>

            <div className={styled['pill-check-wrapper']}>
              {disponibilityData?.data &&
                disponibilityData.data.availableTimes.map(
                  (dispo, id) => (
                    <PillCheck name={'time'} label={dispo} key={id} />
                  )
                )}
            </div>
          </div>

          <div className={styled['button-wrapper']}>
            <Button isInverted asChild>
              <Link href="/agendas">Cancelar</Link>
            </Button>
            <Button
              disabled={!methods.watch('time')?.length}
              onClick={handleSubmit}
              type="submit"
            >
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
