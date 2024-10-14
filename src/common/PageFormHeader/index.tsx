'use client'

import styled from './styles.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface IPageHeader {
  title: string
}

export default function PageFormHeader({ title }: IPageHeader) {
  const router = useRouter()
  return (
    <div className={styled['page-form-header']}>
      <button
        onClick={() => router.back()}
        className={styled['button-go-back']}
      >
        <Image
          src="/svg/arrow_right.svg"
          width={16}
          height={16}
          alt="icone de voltar"
        />
        <span>Voltar</span>
      </button>

      <h1>{title}</h1>
    </div>
  )
}
