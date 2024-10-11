import { Button } from 'common'
import Link from 'next/link'

import styled from './styles.module.scss'

export default function Header() {
  return (
    <div className={styled['schedules-header']}>
      <h1>Agenda</h1>

      <div className={styled['button-schedule']}>
        <Button asChild>
          <Link href="/agendas/new">
            <span>Nova agenda</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
