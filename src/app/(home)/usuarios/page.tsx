import { Container, Pagination, PageListHeader } from 'common'
import { redirect } from 'next/navigation'
import { getAllUsers } from 'services'

import styled from './styles.module.scss'

import { UsersFilter, UsersList } from 'views/usuarios'

interface IPage {
  searchParams: { [key: string]: any | null | undefined }
}

export default async function UsersPage({ searchParams }: IPage) {
  const { error, data: users } = await getAllUsers({
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
        <PageListHeader title="Usuários" path="/usuarios/novo">
          <span>Novo Usuário</span>
        </PageListHeader>

        <UsersFilter searchParams={searchParams} />

        <UsersList users={users?.data} />

        <Pagination
          path="usuarios"
          searchParams={searchParams}
          pagination={users?.meta}
        />
      </Container>
    </section>
  )
}
