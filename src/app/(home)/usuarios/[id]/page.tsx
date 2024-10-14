import { Container, PageFormHeader } from 'common'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import styled from './styles.module.scss'

import {} from 'views/usuarios'

export default async function EditEquipament({
  params
}: {
  params: { id: string }
}) {
  const token = cookies().get('user-auth')?.value

  console.log('user', params)

  if (!token) {
    redirect('/login')
  }

  return (
    <section className={styled['main-schedules-new']}>
      <Container>
        <PageFormHeader title="Editar equipamento" />
      </Container>
    </section>
  )
}
