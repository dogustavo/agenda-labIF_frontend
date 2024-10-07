'use client'

import Image from 'next/image'
import { Input, Button } from 'common'

import styled from './styles.module.scss'
import { useForm, FormProvider } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import type { IAuth } from 'types/auth'

interface IAuthForm {
  email: string
  password: string
}

interface ILoginProp {
  handleSubmit: (data: IAuthForm) => Promise<IAuth | undefined>
}

export default function LoginForm({ handleSubmit }: ILoginProp) {
  const methods = useForm<IAuthForm>()
  const router = useRouter()

  const onSubmit = methods.handleSubmit(async (values) => {
    const user = await handleSubmit(values)
    console.log('res', user)
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
