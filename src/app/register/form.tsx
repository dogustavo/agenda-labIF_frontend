'use client'

import { Input, Button } from 'common'

import styled from './styles.module.scss'
import { useForm, FormProvider } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import type { IUserRegister } from 'types/auth'

interface IRegisterProp {
  handleSubmit: (
    data: IUserRegister
  ) => Promise<IUserRegister | undefined>
}

export default function RegisterForm({
  handleSubmit
}: IRegisterProp) {
  const methods = useForm<IUserRegister>()
  const router = useRouter()

  const onSubmit = methods.handleSubmit(async (values) => {
    handleSubmit(values)

    router.push('/')
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} noValidate>
        <div className={styled['form-inputs']}>
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

        <Button type="submit">Criar conta</Button>
      </form>
    </FormProvider>
  )
}
