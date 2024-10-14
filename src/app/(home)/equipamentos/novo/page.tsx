import { Container, PageFormHeader } from 'common'

import styled from './styles.module.scss'

import { NewEquipamentForm } from 'views/equipamentos'

export default async function NewEquipament() {
  return (
    <section className={styled['main-schedules-new']}>
      <Container>
        <PageFormHeader title="Novo equipamento" />

        <NewEquipamentForm />
      </Container>
    </section>
  )
}
