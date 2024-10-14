'use client'

import { Button, Toast, Input, Select } from 'common'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from './styles.module.scss'
import { useEffect, useState } from 'react'
import { editUser, getUsersTypes } from 'services'
import { ToastStore, useToast } from 'store/notification'
import { revalidateGeneral } from 'server/reavlidation'
import Link from 'next/link'

import userSchema from './schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { IUserRegisterResponse } from 'types/user'

export default function UserForm({
  user
}: {
  user: IUserRegisterResponse
}) {
  const methods = useForm<IUserRegisterResponse>({
    resolver: zodResolver(userSchema)
  })
  const { setShowToast, type } = useToast(
    (state: ToastStore) => state
  )

  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    if (user.name) {
      methods.setValue('name', user.name)
    }
    if (user.email) {
      methods.setValue('email', user.email)
    }
    if (user.role) {
      methods.setValue('role', user.role)
    }
    if (user.userType) {
      methods.setValue('userType', user.userType)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    mutationFn: editUser,
    onSuccess: async (ctx) => {
      if (ctx.error) {
        setAlertMessage('Não foi possível editar usuário')
        setShowToast({
          isOpen: true,
          type: 'error'
        })

        return
      }

      setAlertMessage('Usuário editado com sucesso')
      setShowToast({
        isOpen: true,
        type: 'success'
      })

      await revalidateGeneral({
        path: '/usuarios',
        redirectTo: `/usuarios/${user.id}`
      })
    }
  })

  if (isFetching) {
    return <p>Carregando Informações...</p>
  }

  const handleSubmit = methods.handleSubmit(async (values) => {
    await mutate({
      params: values,
      id: user.id
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
                defaultValue={user.userType}
                placeholder="Selecione tipo do usuário"
                options={userTypes}
              />
              <Select
                name="role"
                defaultValue={user.role}
                placeholder="Seleciono papel do usuário"
                options={[
                  { label: 'Admin', value: 'admin' },
                  { label: 'Aprovador', value: 'approver' }
                ]}
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
