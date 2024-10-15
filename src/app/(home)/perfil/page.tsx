import { Container, PageFormHeader } from 'common'

import { EditProfileForm } from 'views/perfil'

import styled from './styles.module.scss'

export default async function Perfil() {
  return (
    <section className={styled['main-profile-page']}>
      <Container>
        <PageFormHeader title="Editar perfil" />

        <EditProfileForm />
      </Container>
    </section>
  )
}
