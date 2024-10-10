'use client'

import Image from 'next/image'

import styled from './styles.module.scss'

interface IModalHeader {
  closeModal?: () => void
  title: string
}

export function ModalHeader({ title, closeModal }: IModalHeader) {
  return (
    <div className={styled['modal-header']}>
      <h3>{title}</h3>
      <button onClick={closeModal}>
        <Image
          src="/svg/close.svg"
          width={24}
          height={24}
          alt="Icone X para fechar o modal"
        />
      </button>
    </div>
  )
}
