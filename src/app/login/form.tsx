'use client'
import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input, Button } from 'common'

import { useAuth } from 'store/auth'

import loginSchema from './validation'

import styled from './styles.module.scss'

import type { AuthStore, IAuth, IAuthForm } from 'types/auth'
interface ILoginProp {
  handleSubmit: (data: IAuthForm) => Promise<{
    data?: IAuth
    error?: unknown
  }>
}

export default function LoginForm({ handleSubmit }: ILoginProp) {
  const methods = useForm<IAuthForm>({
    resolver: zodResolver(loginSchema)
  })
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth((state: AuthStore) => state)

  const onSubmit = methods.handleSubmit(async (values) => {
    setIsLoading(true)
    const user = await handleSubmit(values)

    if (user.error) {
      setIsLoading(false)
      console.error('user', user.error)
      return
    }

    if (!user.data) {
      setIsLoading(false)
      console.error('user', user.error)
      return
    }

    signIn({
      ...user.data,
      isAuth: true
    })
    setIsLoading(false)
    router.push('/')
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} noValidate>
        <div className={styled['form-inputs']}>
          <Input
            label="E-mail"
            name="username"
            placeholder="E-mail"
            type="email"
          />
          <Input
            name="password"
            label="Senha"
            placeholder="Senha"
            type="password"
          />
        </div>

        <Button disabled={isLoading} type="submit">
          {isLoading ? 'Carregando...' : 'Entrar'}
        </Button>

        <Link className={styled['register-button']} href="/register">
          <span>Não tenho cadastro</span>
          <Image
            src="/svg/arrow_right.svg"
            width={12}
            height={12}
            alt="Seta apontando para direita"
          />
        </Link>
      </form>
    </FormProvider>
  )
}
