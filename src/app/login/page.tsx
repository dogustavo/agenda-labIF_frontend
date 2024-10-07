'use client'

import Image from 'next/image'
import { Input, Button } from 'common'

import styled from './styles.module.scss'
import { useForm, FormProvider } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const methods = useForm()
  const router = useRouter()

  const onSubmit = methods.handleSubmit(async (values) => {
    console.log('teste', values)

    router.push('/')
  })

  return (
    <main className={styled['main-login']}>
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
            <h1>Bem-vindo de volta!</h1>
            <p>Para acessar, infome seus dados abaixo:</p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={onSubmit} noValidate>
              <div className={styled['form-inputs']}>
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
              </div>

              <Button type="submit">Entrar</Button>

              <Link
                className={styled['register-button']}
                href="/register"
              >
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
        </div>
      </div>
    </main>
  )
}
