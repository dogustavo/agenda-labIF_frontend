'use client'

import { Button, Toast, Input } from 'common'
import { FormProvider, useForm } from 'react-hook-form'
import styled from './styles.module.scss'
import { useEffect, useState } from 'react'
import { editAuthUser } from 'services'
import { ToastStore, useToast } from 'store/notification'
import { revalidateGeneral } from 'server/reavlidation'
import Link from 'next/link'

import { useMutation } from '@tanstack/react-query'
import { IUserResponse } from 'types/user'

import schema from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'server/cookieAction'
import { useAuth } from 'store/auth'
import { AuthStore } from 'types/auth'

interface IFormValues {
  password_check: string
  password: string
  name: string
  email: string
}

interface IPageProp {
  profile?: IUserResponse
}

export default function EditProfileForm({ profile }: IPageProp) {
  const methods = useForm<IFormValues>({
    resolver: zodResolver(schema)
  })
  const { setShowToast, type } = useToast(
    (state: ToastStore) => state
  )
  const { signIn } = useAuth((state: AuthStore) => state)

  const [alertMessage, setAlertMessage] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: editAuthUser,
    onSuccess: async (ctx) => {
      if (ctx.error) {
        setAlertMessage('Não foi possível editar seus dados')
        setShowToast({
          isOpen: true,
          type: 'error'
        })

        return
      }

      if (!ctx.data) {
        setAlertMessage(
          'Não foi possível atulizar sua senha de usuário'
        )
        setShowToast({
          isOpen: true,
          type: 'error'
        })

        return
      }

      setAlertMessage('Usuário salvo com sucesso')
      setShowToast({
        isOpen: true,
        type: 'success'
      })

      signIn({
        ...ctx.data,
        isBlocked: false,
        isReseted: false,
        isAuth: true
      })

      await setCookie('user-auth', ctx.data?.token)
      await setCookie(
        'user-role',
        JSON.stringify({
          role: ctx.data.role,
          isReseted: false
        })
      )
      methods.reset({ password: '', password_check: '' })
      await revalidateGeneral({
        path: '/',
        redirectTo: `/perfil`
      })
    }
  })

  const handleSubmit = methods.handleSubmit(async (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_check, ...rest } = values

    const cleanedData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(rest).filter(([_, value]) => value.trim() !== '')
    )

    await mutate({
      params: cleanedData
    })
  })

  useEffect(() => {
    if (profile?.name) {
      methods.setValue('name', profile.name)
    }
    if (profile?.email) {
      methods.setValue('email', profile.email)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!profile) {
    return <div></div>
  }

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
