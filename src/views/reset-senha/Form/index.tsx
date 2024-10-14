'use client'

import { Button, Toast, Input } from 'common'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from './styles.module.scss'
import { useState } from 'react'
import { changeUserPwd } from 'services'
import { ToastStore, useToast } from 'store/notification'

import passwordSchema from './schema'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from 'store/auth'
import { AuthStore } from 'types/auth'
import { setCookie } from 'server/cookieAction'
import { useRouter } from 'next/navigation'

interface IFormValues {
  password: string
  password_check: string
}

export default function ResetPasswordForm() {
  const router = useRouter()

  const methods = useForm<IFormValues>({
    resolver: zodResolver(passwordSchema)
  })

  const { setShowToast, type } = useToast(
    (state: ToastStore) => state
  )

  const { id: userId, signIn } = useAuth((state: AuthStore) => state)

  const [alertMessage, setAlertMessage] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: changeUserPwd,
    onSuccess: async (ctx) => {
      if (ctx.error) {
        setAlertMessage(ctx.error.message)
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

      setAlertMessage('Usuário criado com sucesso')
      setShowToast({
        isOpen: true,
        type: 'success'
      })

      await setCookie('user-auth', ctx.data?.token)
      await setCookie(
        'user-role',
        JSON.stringify({
          role: ctx.data.role,
          isReseted: false
        })
      )

      signIn({
        ...ctx.data,
        isBlocked: false,
        isReseted: false,
        isAuth: true
      })
      router.push('/')
      //todo set cookie/token/role/isreseted/store
    }
  })

  const handleSubmit = methods.handleSubmit(async (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_check, password } = values

    await mutate({
      password,
      id: userId
    })
  })

  return (
    <div className={styled['form-container']}>
      <FormProvider {...methods}>
        <form className={styled['form-wrapper']}>
          <div className={styled['schedule-form']}>
            <div className={styled['inputs-wrapper']}>
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
