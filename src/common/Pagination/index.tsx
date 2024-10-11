import Link from 'next/link'

import styled from './styles.module.scss'
import Image from 'next/image'
import { formatQueryString } from 'utils/queryString'

interface IPagination {
  pagination?: {
    currentPage: number
    pageSize: number
    totalPages: number
    totalRecords: number
  }
  searchParams: { [key: string]: any | null | undefined }
}

function ShowProvider({
  rules,
  children
}: {
  rules: boolean
  children: React.ReactNode
}) {
  return rules && children
}

const PaginateItem = ({
  isDisabled,
  path,
  children
}: {
  isDisabled: boolean
  path: string
  children: React.ReactNode
}) => {
  if (!isDisabled) {
    return <Link href={path}>{children}</Link>
  }

  return <span>{children}</span>
}

export default function Pagination({
  searchParams,
  pagination
}: IPagination) {
  if (!pagination) {
    return <></>
  }

  const { page: _page = 1, ...rest } = searchParams

  const handlePagination = (type: string): string => {
    const paginate = {
      first: 1,
      prev: +_page - 1,
      next: +_page + 1,
      last: pagination.totalPages
    }[type]

    const filter = {
      page: paginate,
      ...rest
    }

    const queryString = formatQueryString(filter)

    return `/agendas?${queryString}`
  }

  return (
    <div className={styled['pagination_content']}>
      <PaginateItem
        path={handlePagination('prev')}
        isDisabled={_page < 2}
      >
        <div
          className={`${styled.arrow} ${styled['arrow-inverted']}`}
        >
          <Image
            src="/svg/arrow_right.svg"
            width={16}
            height={16}
            alt="Seta par direita"
          />
        </div>
      </PaginateItem>

      <div className={styled['paginate_pages']}>
        <ShowProvider rules={_page > 1}>
          <PaginateItem
            path={handlePagination('prev')}
            isDisabled={false}
          >
            {+_page - 1}
          </PaginateItem>
        </ShowProvider>

        <span className={styled['current-page']}>{_page}</span>

        <ShowProvider rules={_page < pagination.totalPages}>
          <PaginateItem
            path={handlePagination('next')}
            isDisabled={false}
          >
            {+_page + 1}
          </PaginateItem>
        </ShowProvider>
      </div>

      <PaginateItem
        path={handlePagination('next')}
        isDisabled={_page >= pagination.totalPages}
      >
        <div className={styled.arrow}>
          <Image
            src="/svg/arrow_right.svg"
            width={16}
            height={16}
            alt="Seta par direita"
          />
        </div>
      </PaginateItem>
    </div>
  )
}
