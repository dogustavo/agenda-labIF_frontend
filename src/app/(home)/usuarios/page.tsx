import { Button, Container, Pagination } from 'common'
import { redirect } from 'next/navigation'
import { getAllUsers } from 'services'

import styled from './styles.module.scss'
import Link from 'next/link'

import UsersCard from './components/List/Users'
import Filter from './components/List/Filter'

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
        <div className={styled['equipaments-header']}>
          <h1>Usuários</h1>

          <div className={styled['button-new-equipament']}>
            <Button asChild>
              <Link href="/equipamentos/novo">
                <span>Novo Usuário</span>
              </Link>
            </Button>
          </div>
        </div>

        <Filter searchParams={searchParams} />

        <UsersCard users={users?.data} />

        <Pagination
          path="usuarios"
          searchParams={searchParams}
          pagination={users?.meta}
        />
      </Container>
    </section>
  )
}
