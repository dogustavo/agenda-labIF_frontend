import Image from 'next/image'

import styled from './styles.module.scss'

import LoginForm from './form'
import { authLogin } from 'services'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
interface IAuthForm {
  email: string
  password: string
}

export default async function Login() {
  const token = cookies().get('user-auth')?.value

  if (!!token) {
    redirect('/')
  }

  const handleSubmit = async (values: IAuthForm) => {
    'use server'

    const res = await authLogin({ login: values })

    if ('hasError' in res) {
      return
    }

    cookies().set('user-auth', res.token, {
      maxAge: 3600,
      secure: true,
      sameSite: 'strict'
    })

    return res
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
