'use client'

import { Button, Toast, Input, Select } from 'common'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from './styles.module.scss'
import { useState } from 'react'
import { createUser, getUsersTypes } from 'services'
import { ToastStore, useToast } from 'store/notification'
import { revalidateGeneral } from 'server/reavlidation'
import Link from 'next/link'

import userSchema from '../schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { IUserRegister } from 'types/user'

interface IFormValues extends IUserRegister {
  password_check: string
}

export default function NewUserForm() {
  const methods = useForm<IFormValues>({
    resolver: zodResolver(userSchema)
  })
  const { setShowToast, type } = useToast(
    (state: ToastStore) => state
  )

  const [alertMessage, setAlertMessage] = useState('')

  const { data: userTypes = [], isFetching } = useQuery({
    queryKey: ['user-types'],
    queryFn: getUsersTypes,
    refetchOnWindowFocus: false,
    select: ({ data: result, error }) => {
      if (error) {
        return [{ label: 'Outros', value: 'Outros' }]
      }

      return result?.data.map((ele) => {
        return {
          label: ele.description,
          value: ele.description
        }
      })
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: async (ctx) => {
      if (ctx.error) {
        setAlertMessage('Não foi possível criar novo usuário')
        setShowToast({
          isOpen: true,
          type: 'error'
        })

        return
      }

      setAlertMessage('Usuário criado com sucesso')
      setShowToast({
        isOpen: true,
        type: 'success'
      })
      methods.reset()
      await revalidateGeneral({
        path: '/usuarios',
        redirectTo: `/usuarios/novo`
      })
    }
  })

  if (isFetching) {
    return <p>Carregando Informações...</p>
  }

  const handleSubmit = methods.handleSubmit(async (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_check, ...rest } = values

    await mutate({
      data: { ...rest }
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
                name="name"
                placeholder="Nome"
                type="text"
              />
              <Input
                label="E-mail"
                name="email"
                placeholder="E-mail"
                type="email"
              />
              <Select
                name="userType"
                placeholder="Selecione tipo do usuário"
                options={userTypes}
              />
              <Select
                name="role"
                placeholder="Seleciono papel do usuário"
                options={[
                  { label: 'Admin', value: 'admin' },
                  { label: 'Aprovador', value: 'approver' }
                ]}
              />
              <Input
                name="password"
                label="Senha"
                placeholder="Senha"
                type="password"
              />
              <Input
                name="password_check"
                label="Confirme sua senha"
                placeholder="Confirme sua senha"
                type="password"
              />
            </div>
          </div>

          <div className={styled['button-wrapper']}>
            <Button isInverted asChild>
              <Link href="/usuarios">Cancelar</Link>
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
