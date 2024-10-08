'use client'

import { Container } from 'common'
import Image from 'next/image'

import styled from './styles.module.scss'
import Link from 'next/link'

import Menu from './Menu'

export default function Header() {
  return (
    <header className={styled.header}>
      <Container>
        <div className={styled.wrapper}>
          <Link href="/">
            <Image
              src="/svg/labif-logo.svg"
              width={180}
              height={50}
              alt="Logo LabIF Maker"
              priority
            />
          </Link>

          <Menu />
        </div>
      </Container>
    </header>
  )
}
