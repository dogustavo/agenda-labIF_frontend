import { getAllSchedules } from 'services/schedules'
import styled from './styles.module.scss'
import { redirect } from 'next/navigation'

import { ListPage } from './components'
import { Container, Pagination } from 'common'

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
        <ListPage.Header />
      </Container>
      <Container>
        <ListPage.Filters searchParams={searchParams} />
      </Container>
      <ListPage.Schedules schedules={schedules?.data} />

      <Container>
        <Pagination
          searchParams={searchParams}
          pagination={schedules?.meta}
        />
      </Container>
    </section>
  )
}
