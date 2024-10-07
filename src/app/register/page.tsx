'use client'

import Image from 'next/image'
import { Container, Input, Button, GoBack } from 'common'

import styled from './styles.module.scss'
import { useForm, FormProvider } from 'react-hook-form'

import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const methods = useForm()

  const onSubmit = methods.handleSubmit(async (values) => {
    console.log('teste', values)

    router.push('/')
  })

  return (
    <main className={styled['main-login']}>
      <Container>
        <GoBack path="/login" />
        <div className={styled.wrapper}>
          <div className={styled['form-content']}>
            <div className={styled['form-header']}>
              <Image
                src="/svg/labif-logo.svg"
                width={240}
                height={80}
                alt="Logo carro fácil seminovos"
                priority
              />
              <h1>Faça seu cadastro</h1>
              <p>
                Entre na plataforma e faça seu agendamento do LABIF
                Maker.
              </p>
            </div>

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
          </div>
        </div>
      </Container>
    </main>
  )
}
