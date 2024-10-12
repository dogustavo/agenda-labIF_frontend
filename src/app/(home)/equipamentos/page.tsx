import { Button, Container, Pagination } from 'common'
import { redirect } from 'next/navigation'
import { getAllEquipaments } from 'services'

import styled from './styles.module.scss'
import Link from 'next/link'

import Equipaments from './components/List/Equipaments'
import Filter from './components/List/Filter'

interface IPage {
  searchParams: { [key: string]: any | null | undefined }
}

export default async function Equipamentos({ searchParams }: IPage) {
  const { error, data: equipaments } = await getAllEquipaments({
    filter: {
      page: searchParams.page || 1,
      ...searchParams
    }
  })

  if (error?.statusCode === 401) {
    return redirect('/login')
  }

  return (
    <section className={styled['main-equipaments-page']}>
      <Container>
        <div className={styled['equipaments-header']}>
          <h1>Equipamentos</h1>

          <div className={styled['button-new-equipament']}>
            <Button asChild>
              <Link href="/equipamentos/novo">
                <span>Novo</span>
              </Link>
            </Button>
          </div>
        </div>

        <Filter searchParams={searchParams} />

        <Equipaments equipaments={equipaments?.data} />

        <Pagination
          path="equipamentos"
          searchParams={searchParams}
          pagination={equipaments?.meta}
        />
      </Container>
    </section>
  )
}
