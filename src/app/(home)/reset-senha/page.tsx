import { Container, PageFormHeader } from 'common'

import styled from './styles.module.scss'

import { ResetPasswordForm } from 'views/reset-senha'

export default async function ResetPwd() {
  return (
    <section className={styled['main-reset']}>
      <Container>
        <PageFormHeader showButton={false} title="Reset de senha" />

        <ResetPasswordForm />
      </Container>
    </section>
  )
}
