import { Container, PageFormHeader } from 'common'

import styled from './styles.module.scss'

import {} from 'views/usuarios'

export default async function EditEquipament({
  params
}: {
  params: { id: string }
}) {
  console.log('user', params)

  return (
    <section className={styled['main-schedules-new']}>
      <Container>
        <PageFormHeader title="Editar equipamento" />
      </Container>
    </section>
  )
}
