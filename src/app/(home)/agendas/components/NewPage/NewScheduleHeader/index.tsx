'use client'

import Image from 'next/image'
import styled from './styles.module.scss'
import { useRouter } from 'next/navigation'

export default function NewScheduleHeader() {
  const router = useRouter()
  return (
    <div className={styled['schedules-header']}>
      <button
        onClick={() => router.push('/agendas')}
        className={styled['button-schedule']}
      >
        <Image
          src="/svg/arrow_right.svg"
          width={16}
          height={16}
          alt="icone de voltar"
        />
        <span>Voltar</span>
      </button>

      <h1>Criar nova agenda</h1>
    </div>
  )
}
