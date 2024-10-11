import { getAllSchedules } from 'services/schedules'
import styled from './styles.module.scss'
import { redirect } from 'next/navigation'

import { ListPage } from './components'
import { Button, Container, Pagination } from 'common'
import Link from 'next/link'

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
        <div className={styled['schedules-header']}>
          <h1>Agenda</h1>

          <div className={styled['button-schedule']}>
            <Button asChild>
              <Link href="/agendas/novo">
                <span>Nova agenda</span>
              </Link>
            </Button>
          </div>
        </div>
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
