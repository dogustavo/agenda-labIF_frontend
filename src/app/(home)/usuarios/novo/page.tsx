import { Container, PageFormHeader } from 'common'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import styled from './styles.module.scss'

import { NewUser } from 'views/usuarios'

export default async function NewUserPage() {
  const token = cookies().get('user-auth')?.value

  if (!token) {
    redirect('/login')
  }

  return (
    <section className={styled['main-users-new']}>
      <Container>
        <PageFormHeader title="Novo Usuário" />

        <NewUser />
      </Container>
    </section>
  )
}
