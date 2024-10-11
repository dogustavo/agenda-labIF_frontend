'use client'

import { Select, DatePicker, Button, Toast } from 'common'
import { FormProvider, useForm } from 'react-hook-form'

import styled from './styles.module.scss'
import { format } from 'date-fns'
import { useState } from 'react'
import { getEquipamentDisponibility } from 'services'
import { ToastStore, useToast } from 'store/notification'

interface IFormProp {
  equipamentsOptions: IEquipaments[] | []
}

interface IEquipaments {
  label: string
  value: number
}

export default function NewScheduleForm({
  equipamentsOptions
}: IFormProp) {
  const methods = useForm()
  const { setShowToast } = useToast((state: ToastStore) => state)

  const [dispLoading, setDispLoading] = useState(false)
  const [dispError, setDispError] = useState('')
  const [equipamentDisponibility, setEquipamentDisponibility] =
    useState<string[]>([])

  const handleSubmit = methods.handleSubmit(async (values) => {
    console.log('values', values)
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

    setDispLoading(true)

    const values = {
      selectedDay: format(date, 'yyyy-MM-dd'),
      equipamentId: equipament
    }

    await new Promise((resolve) => setTimeout(resolve, 3000))

    const { data: disponibility, error } =
      await getEquipamentDisponibility(values)

    setDispLoading(false)

    if (!!error) {
      setDispError(error.message)
      setShowToast({
        isOpen: true,
        type: 'error'
      })
      return
    }
    if (!disponibility?.availableTimes) {
      setDispError('Não foi possível encontra disponibilidade')
      setShowToast({
        isOpen: true,
        type: 'error'
      })
      return
    }

    setEquipamentDisponibility(disponibility?.availableTimes)
  }

  console.log('equipamentDisponibility', equipamentDisponibility)

  return (
    <div className={styled['schedule-form-container']}>
      <FormProvider {...methods}>
        <form>
          <div className={styled['schedule-form']}>
            <div>
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

            <div>
              <p>sim</p>
            </div>
          </div>

          <Button onClick={handleSubmit} type="submit">
            Enviar
          </Button>
        </form>
      </FormProvider>

      {dispError && (
        <Toast.Root>
          <Toast.Header title="Ops!" />
          <Toast.Body>
            <p>{dispError}</p>
          </Toast.Body>
        </Toast.Root>
      )}
    </div>
  )
}
