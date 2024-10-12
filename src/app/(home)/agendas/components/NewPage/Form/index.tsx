'use client'

import { Select, DatePicker, Button, Toast, PillCheck } from 'common'
import { FormProvider, useForm } from 'react-hook-form'

import styled from './styles.module.scss'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { getEquipamentDisponibility } from 'services'
import { ToastStore, useToast } from 'store/notification'
import { addOneHour, areTimesConsecutive } from 'utils/time'
import { createSchedule } from 'services/schedules'
import { revalidateAll } from 'server/reavlidation'
import Link from 'next/link'

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
  const methods = useForm<IFormValues>()
  const { setShowToast, type } = useToast(
    (state: ToastStore) => state
  )

  const [dispLoading, setDispLoading] = useState(false)
  const [scheduleLoading, setScheduleLoadiing] = useState(false)

  const [alertMessage, setAlertMessage] = useState('')
  const [equipamentDisponibility, setEquipamentDisponibility] =
    useState<string[]>([])

  const scheduleDate = methods.watch('scheduleDate')
  const equipamentId = methods.watch('equipamentId')

  useEffect(() => {
    setEquipamentDisponibility([])
  }, [setEquipamentDisponibility, scheduleDate, equipamentId])

  const handleSubmit = methods.handleSubmit(async (values) => {
    if (!validateForm(values)) return

    setScheduleLoadiing(true)

    const schedule = {
      equipamentId: +values.equipamentId,
      scheduleDate: format(values.scheduleDate, 'yyyy-MM-dd'),
      timeInit: values.time[0],
      timeEnd: addOneHour(values.time[values.time.length - 1])
    }

    const { error, data } = await createSchedule(schedule)
    setScheduleLoadiing(false)

    if (!!error) {
      setAlertMessage(error.message)
      setShowToast({
        isOpen: true,
        type: 'error'
      })
      return
    }
    if (!data) {
      setAlertMessage('Não foi possível criar agenda!')
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

    setEquipamentDisponibility([])
    methods.reset()
    await revalidateAll()
  })

  const validateForm = (values: IFormValues) => {
    if (!values.equipamentId || !values.scheduleDate) {
      methods.setError(
        !values.equipamentId ? 'equipamentId' : 'scheduleDate',
        { message: 'Selecione o equipamento e a data' }
      )
      return false
    }
    if (!values.time) {
      setShowToast({
        isOpen: true,
        type: 'error'
      })
      setAlertMessage('Selecione o horário')
      return false
    }
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
    return true
  }

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

    setDispLoading(true)

    const values = {
      selectedDay: format(date, 'yyyy-MM-dd'),
      equipamentId: equipament
    }

    const { data: disponibility, error } =
      await getEquipamentDisponibility(values)

    setDispLoading(false)

    if (!!error) {
      setAlertMessage(error.message)
      setShowToast({
        isOpen: true,
        type: 'error'
      })
      return
    }
    if (!disponibility?.availableTimes) {
      setAlertMessage('Não foi possível encontra disponibilidade')
      setShowToast({
        isOpen: true,
        type: 'error'
      })
      return
    }

    setEquipamentDisponibility(disponibility?.availableTimes)
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
                  {dispLoading
                    ? 'Carregando...'
                    : ' Buscar Horários Disponíveis'}
                </Button>
              </div>
            </div>

            <div className={styled['pill-check-wrapper']}>
              {equipamentDisponibility &&
                equipamentDisponibility.map((dispo, id) => (
                  <PillCheck name={'time'} label={dispo} key={id} />
                ))}
            </div>
          </div>

          <div className={styled['button-wrapper']}>
            <Button isInverted asChild>
              <Link href="/agendas">Cancelar</Link>
            </Button>
            <Button onClick={handleSubmit} type="submit">
              {scheduleLoading ? 'Enviando...' : 'Enviar'}
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
