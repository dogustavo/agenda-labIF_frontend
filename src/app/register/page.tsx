import Image from 'next/image'
import { Container, GoBack } from 'common'

import styled from './styles.module.scss'

import RegisterForm from './form'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { IUserRegister } from 'types/auth'

export default function Register() {
  const token = cookies().get('user-auth')?.value

  if (!!token) {
    redirect('/')
  }

  const handleSubmit = async (values: IUserRegister) => {
    'use server'
    console.log('valu', values)

    // const res = await authLogin({ login: values })

    // if ('hasError' in res) {
    //   return
    // }

    // cookies().set('user-auth', res.token, {
    //   maxAge: 3600,
    //   secure: true,
    //   sameSite: 'strict'
    // })

    return undefined
  }

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

            <RegisterForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </Container>
    </main>
  )
}
