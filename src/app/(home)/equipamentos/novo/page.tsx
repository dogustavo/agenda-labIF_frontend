import { Container } from 'common'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import styled from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

import Form from '../components/Novo/Form'

export default async function NewEquipament() {
  const token = cookies().get('user-auth')?.value

  if (!token) {
    redirect('/login')
  }

  return (
    <section className={styled['main-schedules-new']}>
      <Container>
        <div className={styled['schedules-header']}>
          <Link
            href="/equipamentos"
            className={styled['button-schedule']}
          >
            <Image
              src="/svg/arrow_right.svg"
              width={16}
              height={16}
              alt="icone de voltar"
            />
            <span>Voltar</span>
          </Link>

          <h1>Criar novo equipamento</h1>
        </div>

        <Form />
      </Container>
    </section>
  )
}
