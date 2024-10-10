'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button, Input, Select, DatePicker } from 'common'

import styled from './styles.module.scss'
import { formatQueryString } from 'utils/queryString'
import { useEffect } from 'react'

interface IFilterProp {
  searchParams: { [key: string]: any | null | undefined }
}

export default function Filter({ searchParams }: IFilterProp) {
  const methods = useForm()
  const router = useRouter()

  const selectValue = searchParams.name || ''

  useEffect(() => {
    methods.setValue('name', searchParams.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = methods.handleSubmit(async (values) => {
    const filter = {
      ...searchParams,
      ...values
    }

    console.log('filter', filter)

    // const queryString = formatQueryString(filter)
    // router.push(`/agendas?${queryString}`)
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
              defaultValue={selectValue}
              options={[
                { label: 'Aprovado', value: 'approved' },
                { label: 'Reprovado', value: 'repproved' },
                { label: 'Pendente', value: 'pending' }
              ]}
            />
            <DatePicker
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
