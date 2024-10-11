import { Container } from 'common'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { NewPage } from '../components'

import styled from './styles.module.scss'
import { getAllEquipaments } from 'services'
import Link from 'next/link'
import Image from 'next/image'

interface IPage {
  searchParams: { [key: string]: any | null | undefined }
}

export default async function NewSchedule({ searchParams }: IPage) {
  const token = cookies().get('user-auth')?.value
  const { error, data: equipaments } = await getAllEquipaments({
    filter: {
      page: searchParams.page || 1,
      ...searchParams
    }
  })

  const equipamentsOptions = equipaments?.data
    ? equipaments.data.map((equipament) => {
        return {
          label: equipament.equipamentName,
          value: equipament.id
        }
      })
    : []

  if (!token) {
    redirect('/login')
  }

  if (error?.statusCode === 401) {
    return redirect('/login')
  }

  return (
    <section className={styled['main-schedules-new']}>
      <Container>
        <div className={styled['schedules-header']}>
          <Link href="/agendas" className={styled['button-schedule']}>
            <Image
              src="/svg/arrow_right.svg"
              width={16}
              height={16}
              alt="icone de voltar"
            />
            <span>Voltar</span>
          </Link>

          <h1>Criar nova agenda</h1>
        </div>

        <NewPage.Form equipamentsOptions={equipamentsOptions} />
      </Container>
    </section>
  )
}
