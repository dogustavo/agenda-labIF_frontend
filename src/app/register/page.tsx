import Image from 'next/image'
import { Container, GoBack } from 'common'

import styled from './styles.module.scss'

import RegisterForm from './form'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { IUserRegister } from 'types/auth'
import { getUsersTypes } from 'services'
import { authRegister } from 'services'
import { setCookie } from 'server/cookieAction'

export default async function Register() {
  const token = cookies().get('user-auth')?.value

  const { data: userType } = await getUsersTypes()
  const userOptions = userType
    ? userType.data.map((ele) => {
        return {
          label: ele.description,
          value: ele.description
        }
      })
    : [{ label: 'Outros', value: 'Outros' }]

  if (!!token) {
    redirect('/')
  }

  const handleSubmit = async (values: IUserRegister) => {
    'use server'

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_check, ...rest } = values

    const user = {
      ...rest,
      role: 'user'
    }

    const register = await authRegister({ data: user })

    if (register.error) {
      return {
        error: register.error.message
      }
    }

    if (!register.data) {
      return {
        error: 'Data missing'
      }
    }

    await setCookie('user-auth', register.data.token)
    await setCookie('user-role', register.data.role)
    return { data: register.data }
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

            <RegisterForm
              userType={userOptions}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </Container>
    </main>
  )
}
