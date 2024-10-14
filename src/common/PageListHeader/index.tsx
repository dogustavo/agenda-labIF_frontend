import Button from 'common/Button'
import styled from './styles.module.scss'
import Link from 'next/link'

interface IPageHeader {
  children: React.ReactElement
  path: string
  title: string
}

export default function PageHeader({
  children,
  title,
  path
}: IPageHeader) {
  return (
    <div className={styled['page-header']}>
      <h1>{title}</h1>

      <div className={styled['page-button-header']}>
        <Button asChild>
          <Link href={path}>{children}</Link>
        </Button>
      </div>
    </div>
  )
}
