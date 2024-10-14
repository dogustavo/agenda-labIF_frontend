import { Container, PageFormHeader } from 'common'

import styled from './styles.module.scss'

import { EditUser } from 'views/usuarios'
import { getUserById } from 'services'
import { redirect } from 'next/navigation'

export default async function EditEquipament({
  params
}: {
  params: { id: string }
}) {
  const { data: user, error } = await getUserById({ id: params.id })

  if (error?.statusCode === 401) {
    return redirect('/login')
  }

  return (
    <section className={styled['main-schedules-new']}>
      <Container>
        <PageFormHeader title="Editar usuário" />

        {user ? (
          <EditUser user={user} />
        ) : (
          <div>
            <p>Usuário não encontrado</p>
          </div>
        )}
      </Container>
    </section>
  )
}
