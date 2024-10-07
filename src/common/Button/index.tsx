import React, { ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'

import styled from './styles.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isInverted?: boolean
}

export default function Button({
  asChild,
  isInverted,
  ...props
}: IButton) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={`${styled.button} ${
        isInverted ? styled.inverted : ''
      }`}
      {...props}
    />
  )
}
