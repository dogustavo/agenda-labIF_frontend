import { Container, PageFormHeader } from 'common'
import { redirect } from 'next/navigation'

import styled from './styles.module.scss'
import { getAllEquipaments } from 'services'

import { NewScheduleForm } from 'views/agendas'

interface IPage {
  searchParams: { [key: string]: any | null | undefined }
}

export default async function NewSchedule({ searchParams }: IPage) {
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

  if (error?.statusCode === 401) {
    return redirect('/login')
  }

  return (
    <section className={styled['main-schedules-new']}>
      <Container>
        <PageFormHeader title="Criar nova agenda" />

        <NewScheduleForm equipamentsOptions={equipamentsOptions} />
      </Container>
    </section>
  )
}
