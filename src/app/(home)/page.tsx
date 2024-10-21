import { Container } from 'common'

import styled from './styles.module.scss'

import { UserName } from 'views/home'
import Image from 'next/image'

export default async function Home() {
  return (
    <section className={styled['main-home']}>
      <Container>
        <div className={styled['wrapper']}>
          <div>
            <UserName />

            <div>
              <h1>Seja bem-vindo(a)!</h1>
              <p>
                Esse é painel para realizar o agendamento de
                equipamentos disponives no LabIF Maker do Instituto
                Federal de Educação, Ciência e Tecnologia de São Paulo
                Campus Itapetininga.
              </p>
            </div>
          </div>

          <div className={styled['labif-image']}>
            <Image
              src="/svg/labif-logo.svg"
              // width={580}
              // height={150}
              alt="Logo LabIF Maker"
              placeholder="empty"
              fill
              sizes="100%"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
