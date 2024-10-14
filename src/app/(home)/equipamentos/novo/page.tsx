import { Container, PageFormHeader } from 'common'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import styled from './styles.module.scss'

import { NewEquipamentForm } from 'views/equipamentos'

export default async function NewEquipament() {
  const token = cookies().get('user-auth')?.value

  if (!token) {
    redirect('/login')
  }

  return (
    <section className={styled['main-schedules-new']}>
      <Container>
        <PageFormHeader title="Novo equipamento" />

        <NewEquipamentForm />
      </Container>
    </section>
  )
}
