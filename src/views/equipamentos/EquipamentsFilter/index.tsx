'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button, Input } from 'common'

import styled from './styles.module.scss'
import { formatQueryString } from 'utils/queryString'
import { useEffect } from 'react'

interface IFilterProp {
  searchParams: { [key: string]: any | null | undefined }
}

export default function Filter({ searchParams }: IFilterProp) {
  const methods = useForm()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.name) {
      methods.setValue('name', searchParams.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = methods.handleSubmit(async (values) => {
    if (!values.name) {
      return
    }

    const filter = {
      ...values
    }

    const queryString = formatQueryString(filter)
    router.push(`/equipamentos?${queryString}`)
  })

  const handleClearFilter = () => {
    methods.reset()
    router.push(`/equipamentos`)
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
