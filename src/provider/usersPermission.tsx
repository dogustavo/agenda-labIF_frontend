'use client'
import React from 'react'
import { useAuth } from 'store/auth'
import { AuthStore } from 'types/auth'
import { useStore } from 'zustand'

interface AllowProps {
  roles: string[]
  children: React.ReactNode
}

export default function Allow({ roles, children }: AllowProps) {
  const user = useStore(
    useAuth,
    (state: AuthStore) => state
  ) as AuthStore

  return roles.includes(user.role) ? children : null
}
