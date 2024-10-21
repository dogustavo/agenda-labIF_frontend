'use client'

import { useAuth } from 'store/auth'
import styled from './styles.module.scss'
import { AuthStore } from 'types/auth'

export default function UserName() {
  const { name: userName } = useAuth((state: AuthStore) => state)

  return <p className={styled['user-name']}>Olá, {userName}</p>
}
