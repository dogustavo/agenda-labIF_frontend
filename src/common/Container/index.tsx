import React from 'react'

import styled from './styles.module.scss'

type ContainerProps = {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className={styled.container}>{children}</div>
}
