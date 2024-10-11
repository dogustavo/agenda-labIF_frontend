import { Container } from 'common'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { NewPage } from '../components'

import styled from './styles.module.scss'
import { getAllEquipaments } from 'services'

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

  console.log('equipaments', equipaments?.data)

  return (
    <section className={styled['main-schedules-new']}>
      <Container>
        <NewPage.Header />

        <NewPage.Form equipamentsOptions={equipamentsOptions} />
      </Container>
    </section>
  )
}
