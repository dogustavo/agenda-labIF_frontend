'use server'

import { cookies } from 'next/headers'

export const getCookie = async (name: string) => {
  const cookie = cookies().get(name)
  return cookie ? cookie.value : null
}

export const setCookie = async (name: string, value: string) => {
  cookies().set(name, value, {
    httpOnly: true,
    path: '/'
  })
}
