import Image from 'next/image'

import styled from './styles.module.scss'
import LoginForm from './form'
import { authLogin } from 'services'

import { setCookie } from 'server/cookieAction'

import { IAuth, IAuthForm } from 'types/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Login() {
  const token = cookies().get('user-auth')?.value

  if (!!token) {
    redirect('/')
  }

  const handleSubmit = async (
    values: IAuthForm
  ): Promise<{
    data?: IAuth
    error?: unknown
  }> => {
    'use server'

    const res = await authLogin({ login: values })

    if (res.error?.statusCode === 404) {
      return {
        error: res.error.message
      }
    }

    if (!res.data) {
      return {
        error: 'Data missing'
      }
    }

    await setCookie('user-auth', res.data.token)
    return { data: res.data }
  }

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

          <LoginForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  )
}
