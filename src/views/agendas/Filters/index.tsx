'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button, Input, Select, DatePickerRange } from 'common'

import styled from './styles.module.scss'
import { formatQueryString } from 'utils/queryString'
import { useEffect } from 'react'
import { format, parseISO } from 'date-fns'

interface IFilterProp {
  searchParams: { [key: string]: any | null | undefined }
}

export default function Filter({ searchParams }: IFilterProp) {
  const methods = useForm()
  const router = useRouter()

  // const selectValue = searchParams.status || ''

  useEffect(() => {
    if (searchParams.name) {
      methods.setValue('name', searchParams.name)
    }

    if (searchParams.status) {
      methods.setValue('status', searchParams.status)
    }

    if (searchParams.startDate && searchParams.endDate) {
      methods.setValue('date', [
        parseISO(searchParams.startDate),
        parseISO(searchParams.endDate)
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = methods.handleSubmit(async (values) => {
    const { date, ...rest } = values

    if (date?.length) {
      rest.startDate = format(date[0], 'yyyy-MM-dd')
      rest.endDate = format(date[1], 'yyyy-MM-dd')
    }

    const filter = {
      ...searchParams,
      ...rest
    }

    const queryString = formatQueryString(filter)
    router.push(`/agendas?${queryString}`)
  })

  const handleClearFilter = () => {
    methods.reset()
    router.push(`/agendas`)
  }

  return (
    <div className={styled['form-wrapper']}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <div className={styled.inputs}>
            <Input
              label="Nome"
              name="name"
              placeholder="Nome"
              type="text"
            />
            <Select
              name="status"
              defaultValue={searchParams.status}
              options={[
                { label: 'Aprovado', value: 'approved' },
                { label: 'Reprovado', value: 'repproved' },
                { label: 'Pendente', value: 'pending' }
              ]}
            />
            <DatePickerRange
              name="date"
              label="Data"
              placeholder={'Selecione uma data'}
            />
          </div>

          <div className={styled.button}>
            <button
              type="button"
              onClick={handleClearFilter}
              className={styled['clear-filter']}
            >
              Limpar
            </button>
            <Button type="submit">Buscar</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
