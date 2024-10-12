import { Container } from 'common'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import styled from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { getEquipament } from 'services'

import Form from '../components/Edit/Form'

export default async function EditEquipament({
  params
}: {
  params: { id: string }
}) {
  const token = cookies().get('user-auth')?.value
  const { error, data: equipament } = await getEquipament(params.id)

  if (!token) {
    redirect('/login')
  }

  if (error?.statusCode === 401) {
    return redirect('/login')
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

          <h1>Editar equipamento</h1>
        </div>

        {equipament && Object.keys(equipament).length ? (
          <Form equipament={equipament} />
        ) : (
          <div>
            <p>Equipamento não encontrado</p>
          </div>
        )}
      </Container>
    </section>
  )
}
