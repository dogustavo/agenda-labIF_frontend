import { Container, Pagination, PageListHeader } from 'common'
import { redirect } from 'next/navigation'
import { getAllEquipaments } from 'services'

import styled from './styles.module.scss'

import {
  EquipamentsFilter,
  EquipamentsList
} from 'views/equipamentos'

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
        <PageListHeader
          path="/equipamentos/novo"
          title="Equipamentos"
        >
          <span>Novo</span>
        </PageListHeader>

        <EquipamentsFilter searchParams={searchParams} />

        <EquipamentsList equipaments={equipaments?.data} />

        <Pagination
          path="equipamentos"
          searchParams={searchParams}
          pagination={equipaments?.meta}
        />
      </Container>
    </section>
  )
}
