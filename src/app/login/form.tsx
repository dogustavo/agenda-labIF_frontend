'use client'

import Image from 'next/image'
import { Input, Button } from 'common'

import styled from './styles.module.scss'
import { useForm, FormProvider } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import type { AuthStore, IAuth, IAuthForm } from 'types/auth'
import { useAuth } from 'store/auth'

interface ILoginProp {
  handleSubmit: (data: IAuthForm) => Promise<{
    data?: IAuth
    error?: unknown
  }>
}

export default function LoginForm({ handleSubmit }: ILoginProp) {
  const methods = useForm<IAuthForm>()
  const router = useRouter()
  const { signIn } = useAuth((state: AuthStore) => state)

  const onSubmit = methods.handleSubmit(async (values) => {
    const user = await handleSubmit(values)

    if (user.error) {
      console.error('user', user.error)
      return
    }

    if (!user.data) {
      console.error('user', user.error)
      return
    }

    signIn({
      ...user.data,
      isAuth: true
    })
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

        <Button type="submit">Entrar</Button>

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
