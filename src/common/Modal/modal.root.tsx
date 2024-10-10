'use client'

import { useEffect } from 'react'
import classnames from 'classnames'

import styled from './styles.module.scss'

interface IModalProp {
  isOpen?: boolean
  children: React.ReactNode
}

export function ModalRoot({ children, isOpen = false }: IModalProp) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [isOpen])

  return (
    <div
      className={classnames(styled['modal-overlay'], {
        [styled['is-open']]: isOpen
      })}
    >
      <div className={styled['modal-root']}>{children}</div>
    </div>
  )
}
