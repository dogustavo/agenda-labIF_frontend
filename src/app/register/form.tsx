'use client'

import { Input, Button, Select } from 'common'

import styled from './styles.module.scss'
import { useForm, FormProvider } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import type { AuthStore, IUserRegister } from 'types/auth'
import { useAuth } from 'store/auth'
import { IUserResponse } from 'types/user'

interface IRegisterProp {
  userType: {
    label: string
    value: string
  }[]
  handleSubmit: (
    data: IUserRegister
  ) => Promise<{ data?: IUserResponse; error?: unknown }>
}

export default function RegisterForm({
  handleSubmit,
  userType
}: IRegisterProp) {
  const methods = useForm<IUserRegister>()
  const router = useRouter()
  const { signIn } = useAuth((state: AuthStore) => state)

  const onSubmit = methods.handleSubmit(async (values) => {
    const register = await handleSubmit(values)

    if (register?.error) {
      console.error('user', register.error)
      return
    }

    if (!register.data) {
      console.error('user', register.error)
      return
    }

    signIn({
      token: register.data.token,
      name: register.data.name,
      email: register.data.email,
      id: register.data.id,
      role: register.data.role,
      isAuth: true
    })
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
          <Select name="userType" options={userType} />
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
