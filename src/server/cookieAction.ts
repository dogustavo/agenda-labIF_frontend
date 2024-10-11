'use server'

import { cookies } from 'next/headers'

export const getCookie = async (name: string) => {
  const cookie = cookies().get(name)
  return cookie ? cookie.value : null
}

export const setCookie = async (name: string, value: string) => {
  cookies().set(name, value, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60
  })
}

export const removeCookie = async (name: string) => {
  cookies().set(name, '', {
    maxAge: -1,
    path: '/'
  })
}
