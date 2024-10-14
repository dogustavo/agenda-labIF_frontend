import { getAllSchedules } from 'services/schedules'
import styled from './styles.module.scss'
import { redirect } from 'next/navigation'

import { Container, Pagination, PageListHeader } from 'common'

import { FilterScedules, SchedulesList } from 'views/agendas'

interface IPage {
  searchParams: { [key: string]: any | null | undefined }
}

export default async function Agenda({ searchParams }: IPage) {
  const { error, data: schedules } = await getAllSchedules({
    filter: {
      page: searchParams.page || 1,
      ...searchParams
    }
  })

  if (error?.statusCode === 401) {
    return redirect('/login')
  }

  return (
    <section className={styled['main-schedules-page']}>
      <Container>
        <PageListHeader path="/agendas/novo" title="Agenda">
          <span>Nova agenda</span>
        </PageListHeader>
      </Container>
      <Container>
        <FilterScedules searchParams={searchParams} />
      </Container>
      <SchedulesList schedules={schedules?.data} />

      <Container>
        <Pagination
          path="agendas"
          searchParams={searchParams}
          pagination={schedules?.meta}
        />
      </Container>
    </section>
  )
}
