import { Container, PageFormHeader } from 'common'

import { EditProfileForm } from 'views/perfil'

import styled from './styles.module.scss'
import { getUserProfile } from 'services'
import { redirect } from 'next/navigation'

export default async function Perfil() {
  const { data: profile, error } = await getUserProfile()

  if (error?.statusCode === 401) {
    return redirect('/login')
  }

  return (
    <section className={styled['main-profile-page']}>
      <Container>
        <PageFormHeader title="Editar perfil" />

        <EditProfileForm profile={profile} />
      </Container>
    </section>
  )
}
